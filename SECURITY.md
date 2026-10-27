# Security policy

## Supported versions

This project is pre-1.0. Security fixes apply to the latest revision on `main` only.

## Reporting a vulnerability

Do not open a public issue for a vulnerability, exposed secret, personal data, or unsafe agent action. Use GitHub private vulnerability reporting after it is enabled for the repository. Until then, contact the repository owner through the private contact method listed on their GitHub profile.

Include the affected revision, reproduction steps, impact, and a minimal sanitized example. Do not include real credentials or customer data.

## Agent safety boundary

- Runs must use a disposable checkout without `.env` or production data.
- Network and external side effects are denied unless a human explicitly approves them.
- Agents do not push, merge, release, deploy, or publish.
- Model conclusions cannot override deterministic tests or human approval.
- Raw trajectories are private by default and must be inspected before publication.
