# Private source sanitization checklist

Use this checklist before deriving MailFlow Lab from a private project. Sanitization is a new-source preparation process, not a broad search-and-replace.

## 1. Ownership and scope

- [ ] Confirm the owner has the right to publish every copied file.
- [ ] Inventory third-party code, fonts, images, templates, and generated assets.
- [ ] Record each dependency's license and attribution requirement.
- [ ] Define the smallest modules needed for the public learning exercise.
- [ ] Exclude customer-specific integrations and operational configuration.

## 2. Create a clean source tree

- [ ] Start in a new directory without the private `.git` history.
- [ ] Copy only allowlisted source files; do not copy the whole tree and delete later.
- [ ] Exclude `.env*`, credentials, certificates, keys, tokens, uploads, logs, state, backups, exports, caches, and build output.
- [ ] Replace internal package names, domains, URLs, paths, organization names, and product identifiers.
- [ ] Recreate fixtures with synthetic names, addresses, content, and timestamps.

## 3. Inspect content and behavior

- [ ] Search text and filenames for private brand terms and project codenames.
- [ ] Search for email addresses, phone numbers, hostnames, IP addresses, IDs, and absolute paths.
- [ ] Search for high-entropy strings and common secret formats.
- [ ] Remove analytics IDs, SMTP endpoints, webhook targets, cloud resource names, and error-reporting DSNs.
- [ ] Ensure dry-run is the default and external network calls are disabled in tests.
- [ ] Ensure screenshots, sample spreadsheets, and documentation contain only synthetic data.

## 4. Build public evidence

- [ ] Add a fresh README, license, security policy, and attribution notices.
- [ ] Add deterministic tests before running a coding agent.
- [ ] Run tests without private environment variables.
- [ ] Run a secret scanner on the complete public tree.
- [ ] Review the staged diff and file list manually.
- [ ] Have a second human or independent review agent inspect the sanitized result.

## 5. Publication gate

Public release is blocked until ownership, license compatibility, secret scan, personal-data review, tests, and manual diff review all pass. Do not publish private Git history or raw agent trajectories.

## 6. Provider transfer gate

The owner permits sanitized source to be sent to the DeepSeek API. This permission applies only after this checklist passes. The original private tree, private Git history, secrets, real records, logs, uploads, state, and unsanitized trajectories remain prohibited inputs.
