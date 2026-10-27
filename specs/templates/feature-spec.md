# Feature: <short title>

## Metadata

- ID: `<PROJECT-NNN>`
- Status: `DRAFT | APPROVED | IMPLEMENTED | REVIEWED`
- Owner: `<human owner>`
- Created: `<YYYY-MM-DD>`
- Approved by / at: `<required before implementation>`
- Source revision: `<commit SHA>`

## Problem

Describe the observable problem, affected user, impact, and one sanitized example.

## Current evidence

List observed facts with repository paths, commands, or screenshots. Keep recommendations separate.

## Desired user flow

Describe the normal path and the visible result.

## Business rules

Number each rule. Record defaults, precedence, and decisions that a model must not infer.

## Acceptance criteria

Use observable Given/When/Then statements.

1. **AC-1:** Given ..., when ..., then ...
2. **AC-2:** Given ..., when ..., then ...

## Edge and failure cases

Cover empty input, invalid input, duplicates, partial failure, retry, resume, cancellation, and concurrency where relevant.

## Data and state

State what is read, written, retained, migrated, or deliberately excluded.

## API and UI changes

Document contracts, validation, copy, accessibility, and backward compatibility.

## Security and privacy

List secrets, personal data, external calls, permissions, sanitization, and abuse cases.

## Test plan

Map each acceptance criterion to a deterministic test or an explicit human check.

## Non-goals

List behavior that must remain unchanged.

## Rollback or kill switch

Describe how to disable or reverse the change when applicable.

## Open questions

No behavior-changing question may remain open when status changes to `APPROVED`.
