# Contributing

BrianV Agent Factory is an early experiment. Contributions should strengthen a small, inspectable workflow rather than add autonomy for its own sake.

## Before opening a change

1. Search existing issues.
2. For behavior changes, start from `specs/templates/feature-spec.md`.
3. Keep secrets, personal data, private repository details, logs, and raw trajectories out of Git.
4. Discuss large runtime, provider, or architecture changes before implementation.

## Local checks

Requires Node.js 20 or newer. This repository currently has no third-party JavaScript dependencies.

```bash
npm test
npm run validate
```

## Pull requests

- Keep one coherent concern per pull request.
- Link an approved spec or explain why one is unnecessary.
- Map tests to acceptance criteria.
- Report commands and results; do not rely on an agent's completion statement.
- Declare any AI assistance and confirm that a human reviewed the final diff.
- Do not include generated trajectories unless they have been sanitized.

By contributing, you agree that your contribution is licensed under Apache-2.0.
