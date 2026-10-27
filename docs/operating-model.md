# Mô hình vận hành

## Giai đoạn 1 Ý tưởng

Đầu vào cần có:

- vấn đề và người dùng;
- tác động hiện tại;
- ví dụ cụ thể;
- dữ liệu được phép dùng;
- ranh giới không làm.

Tạo run:

```bash
npm run new:run -- MFL-001 "Skip duplicate email recipients"
```

## Giai đoạn 2 Spec

Spec Agent chỉ đọc source và ghi draft vào output được phép. Agent phải tách:

- fact có bằng chứng trong code;
- recommendation;
- open question cần con người quyết định.

Spec tối thiểu gồm problem, user flow, business rules, acceptance criteria, edge cases, data state, API, UI, security, test plan, non-goals và open questions.

Không chuyển sang implementation khi còn open question làm thay đổi hành vi sản phẩm.

## Giai đoạn 3 Human approval

Người duyệt kiểm tra:

- problem đúng;
- behavior đã chốt;
- acceptance criteria đo được;
- non-goals rõ;
- dữ liệu và quyền phù hợp;
- rollback hoặc kill switch khi cần.

Approval phải ghi `approvedBy`, `approvedAt` và version hoặc hash của spec.

## Giai đoạn 4 Implementation

Coding Agent nhận đúng approved spec, allowed files, forbidden actions và verification commands.

Luồng bên trong worker:

```text
Inspect
  -> Reproduce or establish baseline
  -> Add failing test
  -> Implement minimal change
  -> Run test
  -> Inspect diff
  -> Declare completion
```

Trong những run đầu dùng `confirm` mode, giới hạn bước và giới hạn chi phí. Không dùng `yolo` cho repository có secret, dữ liệu thật hoặc side effect bên ngoài.

## Giai đoạn 5 Factory evaluation

Factory chạy lại gate mà không tin kết luận của agent. Kết quả phải lưu command, exit code và output cần thiết.

Nếu gate thất bại, tạo feedback task hẹp. Không nối một chuỗi sửa vô hạn; giới hạn số repair attempt.

## Giai đoạn 6 Independent review

Review Agent dùng session mới và không nhận reasoning của coder. Nó chỉ nhận approved spec, diff, tests và source cần thiết.

Mỗi acceptance criterion phải được gắn một trạng thái:

- PASS;
- FAIL;
- NOT TESTED;
- BLOCKED.

Không suy ra PASS chỉ vì code trông hợp lý.

## Giai đoạn 7 Human merge

Con người kiểm tra scope, evidence, security và review report. Agent không merge, push hoặc publish trong giai đoạn đầu.

## Giai đoạn 8 Evidence và nội dung

Sau merge, tạo evidence pack đã làm sạch:

- vấn đề;
- approved spec;
- diff chủ chốt;
- test và giới hạn;
- lỗi hoặc lần sửa thất bại;
- quyết định của con người;
- cách chạy lại.

Evidence pack có thể trở thành README, case study, demo hoặc Operator Note. Không công khai trajectory thô nếu chưa kiểm tra secret và dữ liệu cá nhân.
