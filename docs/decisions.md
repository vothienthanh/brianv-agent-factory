# Decision log

This log records product and governance decisions that affect the public repository. Dates use Asia/Saigon time.

## 2026-10-27 — Repository identity and publication

- **Decision:** use the public name **BrianV Agent Factory** and repository slug `brianv-agent-factory`.
- **Decision:** publish under the personal GitHub account [`vothienthanh`](https://github.com/vothienthanh) from the first release.
- **Decision:** make the repository public from the beginning.
- **Decision:** use `BrianV` as the public copyright holder name.
- **Boundary:** the owner must perform a final secret, personal-data, and ownership review before the first push.

## 2026-10-27 — License

- **Decision:** use Apache License 2.0 for repository code and documentation unless a file states otherwise.
- **Reason:** it is permissive like MIT while adding an explicit patent grant, patent termination protection, and change-notice requirements.
- **Boundary:** private-source material and third-party dependencies must be reviewed before copying; this repository's license cannot relicense code the owner does not control.

## 2026-10-27 — First proving ground

- **Decision:** derive MailFlow Lab from a sanitized copy of a private project.
- **Decision:** publish MailFlow Lab as a separate repository at `vothienthanh/mailflow-lab`; keep factory workflow, policy, and evidence contracts in this repository.
- **Required sanitization:** remove brand names, Git history, credentials, `.env`, personal data, real recipient content, uploads, logs, runtime state, production endpoints, screenshots with private data, and organization-specific identifiers.
- **Required review:** confirm ownership and third-party license compatibility before any source is copied into the public repository.

## 2026-10-27 — Initial model provider and budget

- **Decision:** start with the direct DeepSeek API and `deepseek-flash` for Spec, Coding, and Review roles.
- **Decision:** sanitized source may be sent to the DeepSeek API.
- **Boundary:** the original private source tree, private Git history, secrets, real data, logs, uploads, runtime state, and unsanitized artifacts must never be sent to the provider.
- **Decision:** isolate the roles by session, prompt, trajectory, and permissions even when they use the same model.
- **Budget:** USD 0.25 for Spec, USD 0.75 for Coding, USD 0.50 for Review, and USD 0.50 for at most one repair run.
- **Feature ceiling:** USD 2.00, rounded above the role limits to accommodate small accounting delays.
- **Pilot monthly ceiling:** USD 25.00, with no automatic top-up.
- **Escalation:** use `deepseek-v4-pro` only after a recorded Flash failure or for an explicitly high-risk task, with human approval and a separate budget.
- **Review date:** reassess after 10 completed runs or 30 days, whichever comes first.
