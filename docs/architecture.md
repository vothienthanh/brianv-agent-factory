# Kiến trúc ban đầu

## Tổng quan

Factory được chia thành control plane và worker. Control plane quyết định trạng thái, quyền và bằng chứng. Worker thực hiện tác vụ trong sandbox.

```text
Idea or GitHub issue
        |
        v
Specification role
        |
        v
Human approval gate
        |
        v
Coding worker in disposable clone
        |
        v
Deterministic evaluation and security gates
        |
        v
Independent review role
        |
        v
Human merge and release gate
        |
        v
Evidence pack and public learning
```

## Các lớp

### Control plane

Chịu trách nhiệm:

- run ID và state transition;
- approved specification;
- role configuration;
- task scope và forbidden actions;
- model, budget và timeout;
- approval record;
- đường dẫn tới trajectory, diff và test result;
- final disposition.

Lõi hiện tại chỉ triển khai state machine nhỏ trong `src/workflow.js`.

### Worker adapter

Worker đầu tiên là `mini-swe-agent`. Factory không phụ thuộc vào chi tiết nội bộ của worker; task, repository path, model, role config và output path được truyền qua adapter hoặc command line.

Adapter tương lai có thể hỗ trợ:

- OpenHands Software Agent SDK;
- coding agent chạy trong GitHub;
- worker local khác có thể sinh patch và trajectory.

### Sandbox

Mỗi implementation run dùng disposable clone, không dùng checkout chứa dữ liệu thật.

Mặc định:

- không mount `.env`;
- không mount credential store;
- không mount Docker socket;
- network tắt trừ domain được duyệt;
- giới hạn CPU, RAM, thời gian và chi phí;
- chỉ workspace được ghi;
- output artifacts được lưu riêng.

### Deterministic gates

Agent có thể chạy test để tự sửa, nhưng factory phải chạy lại độc lập:

- syntax check;
- unit và integration test;
- build;
- lint và type check khi có;
- `git diff --check`;
- allowlist file scope;
- secret scan;
- dependency và license checks;
- acceptance-criteria evidence check.

## Role boundaries

| Role | Repository | Quyền ghi | Mạng | Đầu ra |
|---|---|---:|---:|---|
| Spec | Read-only snapshot | Chỉ output draft | Off | Feature spec |
| Coder | Disposable clone | Trong scope | Off mặc định | Diff, tests, trajectory |
| Reviewer | Fresh disposable clone | Không sửa source | Off mặc định | PASS FAIL NOT TESTED report |

Cùng một model có thể đảm nhiệm ba role, nhưng phải dùng session và trajectory độc lập.

## Run state machine

```text
IDEA
  -> SPEC_DRAFT
  -> WAITING_FOR_APPROVAL
  -> READY_TO_BUILD
  -> IMPLEMENTING
  -> IMPLEMENTED
  -> REVIEW_PASSED or REVIEW_FAILED
  -> WAITING_FOR_MERGE
  -> COMPLETE
```

`CANCELLED` có thể được đi tới từ mọi trạng thái chưa hoàn tất. Hai transition cần bằng chứng human approval:

- `WAITING_FOR_APPROVAL -> READY_TO_BUILD`;
- `WAITING_FOR_MERGE -> COMPLETE`.

## Run artifacts

```text
runs/<run-id>/
  idea.md
  manifest.json
  spec-draft.md
  spec-approved.md
  implementation.traj.json
  diff.patch
  test-results.txt
  review.md
  release-decision.md
```

`runs/` bị Git ignore. Artifact muốn công khai phải được kiểm tra secret, PII và quyền sử dụng trước khi đưa vào tài liệu hoặc example.

## Những thứ chưa xây

- dashboard;
- database và distributed queue;
- parallel multi-agent orchestration;
- automatic model router;
- automatic merge, release hoặc deploy;
- marketplace và plugin registry;
- long-term agent memory.

Các thành phần này chỉ được cân nhắc khi một run thật chứng minh nhu cầu.
