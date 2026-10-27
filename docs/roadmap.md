# Lộ trình 90 ngày

## Tuần 1 và 2 Nền tảng

- chốt tên repository, owner và license;
- hoàn thiện role prompt và run manifest;
- tạo Git baseline cho MailFlow Lab hoặc một fixture tương đương đã làm sạch;
- chạy bài test foundation;
- lưu run đầu tiên và viết retrospective.

Kết quả cần có:

- một run tạo được bằng CLI;
- test và validation của factory xanh;
- một trajectory được review an toàn.

## Tuần 3 đến 6 Feature đầu tiên

- Spec Agent tạo draft cho duplicate recipients;
- con người chốt business rules;
- Coding Agent triển khai backend và test;
- nối frontend ở run riêng;
- Review Agent đánh giá theo acceptance criteria;
- ghi chi phí, thời gian và human intervention.

Kết quả cần có:

- một feature thật đi qua toàn bộ state machine;
- evidence pack đã làm sạch;
- một bài viết kỹ thuật hoặc demo.

## Tuần 7 đến 10 Tái sử dụng

- chọn feature thứ hai khác loại;
- dùng lại role, manifest và gates;
- ghi phần phải copy hoặc sửa thủ công;
- chỉ trích xuất abstraction đã lặp lại hai lần;
- thêm security và secret scan phù hợp.

Kết quả cần có:

- bằng chứng reuse trên hai feature;
- adapter worker đủ nhỏ để thay thế;
- release rubric ổn định hơn.

## Tuần 11 và 12 Public foundation

- biên tập README và quickstart;
- public example spec và sanitized evidence;
- hoàn thiện CONTRIBUTING và SECURITY;
- kiểm tra license, attribution và dữ liệu;
- quyết định có public factory core hay chỉ public examples.

## Điều kiện không được bỏ qua để chạy theo lịch

- Không public trajectory chứa secret hoặc PII.
- Không đánh dấu PASS cho acceptance criterion chưa test.
- Không bật auto-merge khi chưa có đủ run history.
- Không thêm multi-agent chỉ để tăng mức tự động hóa trình diễn.
