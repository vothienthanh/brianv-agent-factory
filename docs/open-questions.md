# Các câu hỏi cần chốt

Các câu hỏi được sắp theo mức độ ảnh hưởng. Giá trị đề xuất giúp dự án tiếp tục chạy nhưng chưa thay thế quyết định của chủ dự án.

## Ưu tiên cao

### Chủ thể và tên công khai — đã chốt phần chính

- Repository nằm dưới GitHub cá nhân [`vothienthanh`](https://github.com/vothienthanh) và public ngay từ đầu.
- Tên public là **BrianV Agent Factory**, repository `brianv-agent-factory`.
- Copyright public dùng tên `BrianV`.
- Còn mở: có cần đăng ký domain trước v1.0 không?
- ZiniSoft có vai trò sở hữu hay chỉ là bối cảnh nghề nghiệp?

Đề xuất ban đầu: GitHub cá nhân làm điểm neo; ZiniSoft không sở hữu mặc định nếu đây là dự án cá nhân.

### Proving ground đầu tiên — đã chọn nguồn

- MailFlow Lab sẽ lấy từ code private đã làm sạch và trở thành case study public.
- Dữ liệu và template mẫu nào được phép public?
- Có quyền công khai nguồn gốc, screenshot và kết quả không?

Đề xuất ban đầu: chỉ public MailFlow Lab và sanitized evidence; không công khai tên, dữ liệu hoặc lịch sử của sản phẩm thương hiệu riêng.

### Model và ngân sách — đã có pilot policy

- Provider đầu tiên là DeepSeek; mặc định dùng `deepseek-flash`.
- Budget pilot: Spec USD 0.25, Coding USD 0.75, Review USD 0.50, một repair USD 0.50; tối đa USD 2/feature và USD 25/tháng.
- Source đã làm sạch được phép gửi sang DeepSeek API; source private gốc và dữ liệu thật không được gửi.

Đề xuất ban đầu: một strong model, ba session độc lập, confirm mode, budget cố định cho từng run.

## Ưu tiên trung bình

### License — đã chốt

- Giữ Apache-2.0.
- Chủ thể copyright public là `BrianV`.
- Prompt, docs, dataset và code có cần license riêng không?

Đề xuất ban đầu: Apache-2.0 cho code; quyết định riêng cho dataset và nội dung trước khi public.

### Ngôn ngữ

- English canonical và Vietnamese summary có được áp dụng cho mọi repo không?
- Issue và contribution guide dùng ngôn ngữ nào?

Đề xuất ban đầu: English cho source và public technical docs; Vietnamese cho planning và selected conversion layer.

### Mức tự động hóa

- Agent có được tự tạo branch và commit không?
- Khi nào cho phép tạo draft PR?
- Điều kiện nào phải thỏa trước auto-merge?

Đề xuất ban đầu: cho phép tạo local patch; chưa push, PR hoặc merge tự động.

## Ưu tiên thấp hơn

- Lưu trajectory bao lâu?
- Evidence pack nào được public mặc định?
- Có cần dashboard hay GitHub Issues đã đủ?
- Khi nào cần organization `.github` repository?
- Khi nào cần OpenHands hoặc worker thứ hai?
- Chỉ số nào xác nhận factory đang tạo giá trị ngoài bản thân tác giả?
