# Chiến lược model và role

## Quyết định giai đoạn đầu

Dùng API trực tiếp của DeepSeek và model `deepseek-flash` cho Spec, Coding và Review để giảm số biến. Ba role dùng session, prompt, permission và trajectory độc lập. Review độc lập đến từ context và evidence tách biệt, không nhất thiết phải dùng provider khác ngay từ đầu.

Thinking effort mặc định là `high`. Chỉ dùng `max` cho review khó hoặc quyết định kiến trúc sau khi human approve.

## Phân bổ đề xuất

| Role hoặc tác vụ | Model ban đầu |
|---|---|
| Spec cho feature có quyết định nghiệp vụ | `deepseek-flash`, high, tối đa USD 0.25 |
| Coding nhiều file hoặc logic rủi ro | `deepseek-flash`, high, tối đa USD 0.75 |
| Review trước merge | `deepseek-flash`, high hoặc max, fresh context, tối đa USD 0.50 |
| Một repair run | `deepseek-flash`, high, tối đa USD 0.50 |
| Chuẩn hóa Markdown và tạo checklist | Có thể chuyển sang model rẻ hơn sau |
| Rename, docs hoặc test cơ học | Benchmark trước khi chuyển |

Model review khác model coding có thể giúp giảm lỗi tương quan, nhưng đây là giả thuyết cần đo chứ không phải bảo đảm.

## Ngân sách pilot

- Hard ceiling cho một feature: USD 2.00.
- Hard ceiling tháng đầu: USD 25.00.
- Nạp ban đầu: USD 10.00 hoặc mức tối thiểu provider cho phép; không bật auto top-up.
- Dừng và duyệt lại khi đạt 80 phần trăm ngân sách tháng.
- Web Search và Fetch bị tắt trong coding run; chỉ bật trong research run riêng có phê duyệt.
- `cost_limit` của worker là guardrail, không phải sổ kế toán tuyệt đối. Đối chiếu usage với dashboard/provider invoice.

Giá có thể thay đổi. Trước mỗi batch lớn, kiểm tra lại trang pricing của provider. Nếu chạy batch linh hoạt, ưu tiên giờ off-peak sau khi xác nhận múi giờ hiện hành của provider.

### Pricing snapshot dùng để lập ngân sách

Kiểm tra ngày 2026-10-27 từ tài liệu chính thức của DeepSeek:

| Model | Cache-miss input / 1M tokens | Output / 1M tokens |
|---|---:|---:|
| `deepseek-flash`, off-peak | USD 0.15 | USD 0.60 |
| `deepseek-flash`, peak | USD 0.30 | USD 1.20 |
| `deepseek-v4-pro`, off-peak | USD 0.66 | USD 1.98 |
| `deepseek-v4-pro`, peak | USD 1.32 | USD 3.96 |

Ví dụ conservative ở peak rate:

- Spec 100k input + 20k output: khoảng USD 0.054.
- Coding 500k input + 80k output: khoảng USD 0.246.
- Review 250k input + 40k output: khoảng USD 0.123.
- Một repair 300k input + 50k output: khoảng USD 0.150.

Tổng ví dụ khoảng USD 0.573; ceiling USD 2.00 để hấp thụ context lớn hơn, retry và sai số cost reporting. Đây là budget guardrail, không phải cam kết giá. Nguồn: <https://api-docs.deepseek.com/quick_start/pricing/>.

Search và Fetch không cần cho coding loop mặc định. Nếu bật sau này, tính riêng theo request và kiểm tra ngày bắt đầu billing trên tài liệu provider.

## Cấu hình

- `models/deepseek-flash-high.yaml`: mặc định cho ba role.
- `models/deepseek-flash-max.yaml`: chỉ dùng cho escalation đã được duyệt.
- API key chỉ tồn tại trong secret store hoặc global config; không lưu trong repository hay trajectory.

Ví dụ:

```bash
mini \
  -c mini.yaml \
  -c models/deepseek-flash-high.yaml \
  -c roles/spec.yaml \
  -t "Read prompts/spec.md and the approved task input."
```

Model overlay cần được smoke-test với phiên bản `mini-swe-agent` và LiteLLM đang cài trước run thật, đặc biệt là tool calls và cost reporting.

## Dữ liệu cần ghi cho mỗi run

- model và provider;
- role;
- task category;
- model calls và chi phí;
- wall time;
- step limit và exit status;
- số lần con người từ chối command;
- test result;
- review findings;
- merged, rejected hoặc reworked.

Sau 10 run hoặc 30 ngày, nhóm task theo độ khó và so sánh actual cost với hard ceiling. Chỉ đổi model hoặc tăng budget khi chất lượng và safety gate có bằng chứng cần thiết.

## Không làm trong bản đầu

- tự động chọn model bằng LLM;
- dùng nhiều model tranh luận không giới hạn;
- tối ưu token trước khi có baseline;
- dùng benchmark công khai thay cho eval của sản phẩm thật.
