# Feature: Skip duplicate email recipients

## Metadata

- ID: `MFL-001`
- Status: `DRAFT`
- Owner: `project-owner`
- Created: `2026-10-27`
- Approved by / at: not approved
- Source revision: sanitized fixture not yet committed

## Problem

An imported recipient list may contain the same email more than once. Sending every row can deliver duplicate messages, waste quota, and make job totals misleading.

## Current evidence

- **Observed fact:** the reference flow imports tabular rows, renders one message per accepted row, and records job status.
- **Observed fact:** the public repository does not yet contain a sanitized MailFlow Lab fixture, so exact code references must be added before approval.
- **Recommendation:** deduplicate before enqueueing messages while retaining an auditable result for every input row.

## Desired user flow

The operator previews an imported file. Valid first occurrences remain sendable. Later rows with the same normalized email are shown as skipped duplicates. Starting the job sends only eligible rows and preserves all row-level outcomes in the summary.

## Proposed business rules

These defaults require human approval:

1. Normalize the candidate email by trimming surrounding whitespace and applying lowercase comparison.
2. The first valid occurrence wins; later occurrences are skipped.
3. Invalid or empty emails are classified before duplicate detection and do not reserve a duplicate key.
4. Job totals include all input rows; sent/failed/skipped counts remain separate.
5. A test-address override does not affect duplicate identity; identity comes from the original recipient email.
6. Resume preserves prior row status and must not re-enqueue a skipped duplicate.
7. Logs and UI may show row number and masked address, but must not expose full recipient data in public evidence.

## Acceptance criteria

1. **AC-1:** Given two valid rows whose addresses differ only by case or surrounding whitespace, when the list is prepared, then the first is eligible and the second is marked `skipped_duplicate`.
2. **AC-2:** Given unique valid addresses, when the list is prepared, then all remain eligible and current ordering is unchanged.
3. **AC-3:** Given invalid or empty addresses, when the list is prepared, then their existing invalid status is preserved and duplicate detection does not reclassify them.
4. **AC-4:** Given a dry-run job with duplicates, when it completes, then no duplicate row enters the send path and the summary reconciles to the total input row count.
5. **AC-5:** Given a persisted job that is resumed, when state is restored, then rows previously marked `skipped_duplicate` remain terminal and are not processed.
6. **AC-6:** Given the feature tests, when they run, then no SMTP connection or external network call occurs.

## Data and state

Add a stable row outcome such as `skipped_duplicate`. Persist it with existing job state. Do not store a new global recipient index or retain data beyond the existing job lifecycle.

## API and UI changes

- API responses should expose separate skipped-duplicate counts without removing existing fields.
- The UI should label duplicate rows and show a reconciled total.
- Exact field names remain open until the sanitized API contract is available.

## Security and privacy

- Tests use synthetic addresses only.
- Public trajectories must mask recipient values.
- Implementation runs without `.env`, SMTP credentials, or network access.

## Test plan

- Unit tests for normalization, first-wins behavior, invalid input, and stable ordering.
- Dry-run integration test for counts and absence of send calls.
- Resume test for persisted skipped status.
- Human UI check for label, totals, and accessibility text.

## Non-goals

- Merging columns from duplicate rows.
- Cross-job suppression lists.
- Fuzzy matching or provider-specific alias normalization.
- Changing retry, rate-limit, template, or SMTP behavior.

## Open questions

1. Should users be able to choose first-wins versus last-wins?
2. What public sanitized fixture will provide exact source references?
3. What are the final API field and UI label names?

This document must not move to `APPROVED` until those behavior and contract decisions are resolved.
