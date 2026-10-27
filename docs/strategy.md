# Chiến lược BrianV Agent Factory

## Mục tiêu

BrianV Agent Factory phục vụ hai mục tiêu kết nối với nhau:

1. Xây các AI agent mã nguồn mở giải quyết công việc có thật.
2. Tạo bằng chứng kỹ thuật và bài học công khai để củng cố thương hiệu Thiên Thành BrianV.

Định vị phù hợp với thương hiệu hiện tại:

> Tôi xây AI agent mã nguồn mở cho những quy trình phải vận hành thật, có giới hạn, có kiểm chứng và con người giữ quyền quyết định.

Factory là hệ thống vận hành nội bộ. Câu chuyện công khai nên tập trung vào vấn đề, quyết định, bằng chứng và giới hạn của từng sản phẩm, không quảng bá số lượng agent được sinh ra.

## Quyết định nền tảng

### Sản phẩm trước, lõi hình thành sau

Không xây platform tổng quát trước khi có nhu cầu thật. Tỷ lệ công sức ban đầu:

- 80 phần trăm cho sản phẩm hoặc feature thật;
- 20 phần trăm cho lõi factory tối thiểu.

Quy tắc trích xuất:

```text
Sản phẩm 1 -> ghi lại quy trình
Sản phẩm 2 -> xác nhận phần dùng chung
Sản phẩm 3 -> ổn định API và factory core
```

Một thành phần chỉ được đưa vào lõi khi đã được dùng lại trong ít nhất hai tình huống độc lập.

### Factory riêng dạng mỏng

Không fork và viết lại coding-agent runtime. Dùng open source cho phần đã được giải quyết tốt, ban đầu là `mini-swe-agent` và có thể thay bằng OpenHands SDK hoặc worker khác sau này.

Factory sở hữu:

- product brief và feature specification;
- role, quyền và policy;
- blueprint repository;
- evaluation dataset;
- test, security và release gate;
- run manifest, trajectory và evidence pack;
- human approval;
- vòng lặp biến công việc thành nội dung công khai.

Factory tái sử dụng:

- model provider và model adapter;
- coding-agent runtime;
- Bash và sandbox;
- Git và GitHub Actions;
- package manager, test runner và security scanner;
- MCP khi cần interoperability.

## Nguyên tắc vận hành

1. AI thực hiện trong phạm vi; con người quyết định và chịu trách nhiệm.
2. Tác vụ rủi ro thấp, đảo ngược được có thể tự động hóa trước.
3. Merge, release, deploy, truy cập secret và giao tiếp ra ngoài luôn có human gate trong giai đoạn đầu.
4. Model báo hoàn thành không đồng nghĩa kết quả đúng.
5. Test, build, lint, scan và policy check phải chạy độc lập bên ngoài agent loop.
6. Mỗi claim công khai phải gắn với evidence có thể xem hoặc chạy lại.
7. Không đưa dữ liệu khách hàng, `.env`, log thật hoặc thông tin người nhận vào agent run công khai.
8. Một worker đơn giản, quan sát được tốt hơn một hệ multi-agent khó giải thích.

## Sản phẩm và bài tập đầu tiên

Một ứng dụng tham chiếu đã làm sạch, mang tên công khai **MailFlow Lab**, được chọn làm proving ground vì có:

- bài toán vận hành thật;
- module backend tương đối rõ;
- logic thuần dễ kiểm thử;
- side effect nguy hiểm đủ để học permission và release gate;
- dry-run giúp kiểm tra mà không gửi email.

Trình tự học:

1. Bổ sung test cho Excel và template.
2. Sửa bất nhất `MAX_RETRIES=0`.
3. Thêm tính năng bỏ qua email trùng lặp.
4. Kiểm thử JobRunner bằng dry-run và temporary state.

## Chỉ số cần theo dõi

North star:

> Số người ngoài tác giả hoàn thành một tác vụ thật bằng agent và muốn dùng lại.

Chỉ số kỹ thuật:

- thời gian từ approved spec đến review-ready diff;
- tỷ lệ acceptance criteria có test;
- tỷ lệ run dừng vì limit, lỗi format hoặc lỗi môi trường;
- chi phí và số model call;
- lỗi được release gate phát hiện;
- số lần con người phải sửa quyết định sản phẩm.

Chỉ số cộng đồng và thương hiệu:

- số người hoàn thành quickstart;
- issue và pull request bên ngoài;
- phản hồi áp dụng được;
- cuộc trò chuyện đúng đối tượng;
- số bài viết có evidence lấy từ run thật.

Không dùng số repository hoặc số star làm chỉ số chính.

## Chiến lược công khai

- GitHub technical content dùng English làm bản chuẩn.
- Có lớp nội dung tiếng Việt cho người đọc và đối tác trong nước.
- Profile cá nhân là điểm neo; organization chỉ cần khi có nhiều maintainer hoặc ranh giới sở hữu rõ.
- Mỗi repository công khai phải có quickstart, status, giới hạn, test, license, security policy và contribution guide.
- Factory core chỉ nên public sau khi đã tạo thành công ít nhất hai loại đầu ra khác nhau.
