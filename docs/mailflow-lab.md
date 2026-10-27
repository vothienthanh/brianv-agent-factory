# Bài thực hành MailFlow Lab

MailFlow Lab được duy trì như repository public độc lập tại <https://github.com/vothienthanh/mailflow-lab>. Factory repository giữ workflow, role và evidence contract; application repository giữ source, test và feature history.

## Hiện trạng quan sát

MailFlow Lab là tên công khai, trung tính cho một ứng dụng mail merge tham chiếu dùng Node.js, Express và React. Nó mô phỏng luồng đọc bảng dữ liệu, render template, tạo job, rate-limit, retry, persist state và cập nhật giao diện qua SSE. Tên này không ám chỉ hoặc liên kết với bất kỳ thương hiệu thương mại nào của tác giả.

Những điểm phù hợp để học:

- `server/excel.js` và `server/template.js` có logic thuần;
- `server/jobRunner.js` có state và side effect để học gate;
- dry-run cho phép kiểm tra mà không gửi SMTP;
- README mô tả hành vi đủ rõ để viết acceptance criteria.

Khoảng trống hiện tại:

- chưa có test script;
- thư mục khảo sát chưa có Git history;
- `.env`, `logs`, `state` và `uploads` không được đưa cho agent;
- runtime side effect cần disposable clone và sandbox.

## Bài 1 Nền kiểm thử

Mục tiêu:

- thêm `npm test` bằng Node built-in test runner;
- kiểm thử normalize phone, email detection, column guess;
- kiểm thử variable extraction, HTML escaping, raw braces và missing mapping;
- không thay đổi hành vi nếu test không phát hiện lỗi.

Kỹ năng học được:

- đọc phạm vi nhỏ;
- tạo baseline;
- viết deterministic evidence;
- review diff.

## Bài 2 Sửa MAX_RETRIES bằng không

Hiện UI chấp nhận retry bằng không, nhưng parser backend chỉ chấp nhận số lớn hơn không nên environment default quay về ba.

Acceptance criteria:

- `MAX_RETRIES=0` cho kết quả bằng không;
- số dương hợp lệ được giữ;
- số âm, rỗng hoặc không phải số quay về ba;
- `PORT`, `RATE_PER_MINUTE` và `RETRY_BACKOFF_MS` tiếp tục yêu cầu số dương;
- không kết nối SMTP;
- có test tái hiện lỗi trước khi sửa.

Agent loop:

```text
Search
  -> Reproduce with a one-line Node command
  -> Add failing test
  -> Split positive and non-negative parsers
  -> Run tests and build
  -> Inspect diff
```

## Bài 3 Bỏ qua email trùng

Đây là feature end-to-end đầu tiên. Draft spec nằm tại `specs/examples/mailflow-skip-duplicates.md`.

Nên chia thành ba run:

1. Spec Agent phân tích read-only.
2. Coding Agent làm backend và test.
3. Coding Agent nối frontend và tài liệu.
4. Review Agent kiểm tra lại toàn bộ bằng session mới.

Không cho agent tự quyết định các câu hỏi như giữ dòng đầu hay dòng cuối, deduplicate theo original email hay test email, và duplicate có xuất hiện trong log hay không.

## Bài 4 JobRunner dry-run

Sau khi ba bài đầu ổn định:

- dùng temporary directory cho state và log;
- export hoặc inject JobRunner để test độc lập;
- kiểm tra valid, invalid, duplicate, retry state và resume;
- bảo đảm test không import credential hoặc gọi SMTP;
- giới hạn thời gian để không chờ rate-limit thật.

## Môi trường an toàn

Agent làm việc trên sanitized disposable clone, không trực tiếp trên checkout thật.

```text
private source or sanitized fixture
  -> review ignored and data files
  -> commit safe baseline
  -> clone to disposable workspace
  -> run agent without .env and external network
  -> collect patch and trajectory
  -> delete or archive workspace after review
```

Các command không cần cho bài học ban đầu và nên bị từ chối:

- `npm run doctor`;
- `npm start` hoặc `npm run dev` khi chưa có test harness;
- đọc `.env`;
- kết nối SMTP;
- `git push`;
- command xóa hoặc reset rộng.

## Tiêu chí hoàn thành lab

- ba task đầu có approved spec hoặc task contract;
- mỗi task có trajectory và independent test result;
- không có secret hoặc PII trong artifact;
- có ít nhất một review finding mà coding loop không tự phát hiện;
- có ghi nhận thời gian, chi phí và can thiệp của con người;
- xác định được hai thành phần thực sự đáng trích xuất vào factory core.
