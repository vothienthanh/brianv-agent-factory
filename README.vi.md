# BrianV Agent Factory

BrianV Agent Factory là control plane nhỏ để xây AI agent mã nguồn mở từ bài toán vận hành thật, kèm đặc tả, kiểm chứng và quyền quyết định của con người.

Dự án được duy trì bởi [BrianV](https://github.com/vothienthanh).

Proving ground đầu tiên là repository độc lập [MailFlow Lab](https://github.com/vothienthanh/mailflow-lab), chỉ chứa source đã làm sạch và fixture tổng hợp.

Dự án không viết lại coding agent. Phiên bản đầu dùng `mini-swe-agent` như một worker có thể thay thế và DeepSeek làm model provider đầu tiên, còn repository này sở hữu phần tạo khác biệt và độ tin cậy:

- chuẩn mô tả tính năng;
- quyền riêng cho Spec, Coding và Review Agent;
- test và release gate tất định;
- human approval trước khi code và trước khi merge;
- manifest, trajectory và bằng chứng chạy lại được.

## Kết luận định hướng

Không xây một platform lớn trước. Dùng một sản phẩm thật để tìm ra lõi cần tái sử dụng:

```text
Sản phẩm 1 -> khám phá quy trình
Sản phẩm 2 -> xác nhận phần dùng chung
Sản phẩm 3 -> ổn định factory core
```

Luồng ban đầu:

```text
Ý tưởng
  -> Spec Agent chỉ đọc
  -> Con người duyệt đặc tả
  -> Coding Agent làm trong disposable clone
  -> Review Agent dùng session độc lập
  -> Con người duyệt merge
  -> Công bố bằng chứng và bài học
```

## Chạy kiểm tra

Repository dùng Node.js built-in, chưa cần dependency ngoài:

```bash
npm test
npm run validate
```

Tạo một run local:

```bash
npm run new:run -- MFL-001 "Bỏ qua người nhận trùng email"
```

`runs/` bị Git ignore vì trajectory có thể chứa đường dẫn, dữ liệu hoặc nội dung không nên công khai. Bằng chứng muốn public phải được biên tập và chuyển sang `specs/examples/` hoặc tài liệu tương ứng.

## Bài chạy mini-SWE-agent đầu tiên

Cài `mini-swe-agent` riêng và chạy trong disposable checkout đã làm sạch. Khi dùng `-c`, cần nạp cấu hình mặc định trước rồi mới nạp role overlay:

```bash
mini \
  -c mini.yaml \
  -c models/deepseek-flash-high.yaml \
  -c roles/spec.yaml \
  -t "Read prompts/spec.md and runs/MFL-001/idea.md. Draft the feature spec at runs/MFL-001/spec.md." \
  -o runs/MFL-001/spec.traj.json
```

Role overlay giới hạn bước, chi phí, thời gian và bật xác nhận; nó không thay thế sandbox của hệ điều hành. Hãy duyệt spec trước khi mở một session coder độc lập.

## Bắt đầu đọc

1. [Các quyết định đã chốt](docs/decisions.md)
2. [Chiến lược](docs/strategy.md)
3. [Kiến trúc](docs/architecture.md)
4. [Mô hình vận hành](docs/operating-model.md)
5. [Chiến lược model và ngân sách](docs/model-strategy.md)
6. [Bài thực hành MailFlow Lab](docs/mailflow-lab.md)
7. [Checklist làm sạch private source](docs/sanitization-checklist.md)
8. [Lộ trình](docs/roadmap.md)
9. [Các câu hỏi còn mở](docs/open-questions.md)

## Trạng thái

Đây là foundation thử nghiệm, chưa phải autonomous factory production. Mốc đầu tiên là hoàn thành một feature thật qua toàn bộ luồng và ghi lại bằng chứng.

## Giấy phép

Copyright 2026 BrianV. Apache-2.0. Code lấy từ dự án private phải được kiểm tra quyền sở hữu, giấy phép bên thứ ba, secret và dữ liệu cá nhân trước khi đưa vào repository public.
