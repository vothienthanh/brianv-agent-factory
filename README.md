# BrianV Agent Factory

BrianV Agent Factory is a small, evidence-led control plane for building open-source AI agents from real operational problems.

The project deliberately does not reimplement a coding agent. It starts with `mini-swe-agent` as an interchangeable worker, uses DeepSeek as the initial model provider, and owns the parts that create trust:

- feature specifications and decision boundaries;
- role-specific permissions for specification, implementation, and review;
- deterministic tests and release gates;
- human approval before implementation and merge;
- run manifests, trajectories, and inspectable evidence.

Vietnamese documentation: [README.vi.md](README.vi.md)

Maintained by [BrianV](https://github.com/vothienthanh).

## Core principle

> AI handles bounded execution. People retain decisions and responsibility.

The initial operating loop is:

```text
Idea
  -> Spec draft
  -> Human approval
  -> Implementation in a disposable clone
  -> Independent review
  -> Human merge
  -> Public evidence and learning
```

## Repository status

This is an experimental foundation, not a production autonomous factory. The first milestone is to complete one real feature through the full loop, then use a second feature to discover what should become reusable core.

## Quick start

Requirements:

- Node.js 20 or newer;
- Git;
- Bash, WSL2, or a container runtime for `mini-swe-agent`;
- a configured model provider supported by `mini-swe-agent`.

Run the local checks:

```bash
npm test
npm run validate
```

Create a run workspace:

```bash
npm run new:run -- MFL-001 "Skip duplicate email recipients"
```

The command creates an ignored local folder under `runs/`. Review the generated `idea.md` and `manifest.json`, then follow [docs/operating-model.md](docs/operating-model.md).

## First mini-SWE-agent exercise

Install `mini-swe-agent` separately and run it from a sanitized disposable checkout. Its CLI replaces the default configuration when `-c` is supplied, so always load `mini.yaml` before a role overlay:

```bash
mini \
  -c mini.yaml \
  -c models/deepseek-flash-high.yaml \
  -c roles/spec.yaml \
  -t "Read prompts/spec.md and runs/MFL-001/idea.md. Draft the feature spec at runs/MFL-001/spec.md." \
  -o runs/MFL-001/spec.traj.json
```

Review and approve the draft before starting a separate coder session. The role overlays provide limits and confirmation behavior; they do not create an operating-system sandbox or enforce read-only access. See [docs/operating-model.md](docs/operating-model.md) for the full sequence.

## Project map

```text
roles/                  mini-swe-agent role overlays
models/                 provider/model overlays without secrets
prompts/                reusable task prompts
schemas/                machine-readable contracts
specs/templates/        feature specification templates
specs/examples/         reviewed learning examples
src/                    minimal control-plane state logic
scripts/                local project utilities
tests/                  deterministic tests
docs/                   strategy, architecture, roadmap, and learning lab
runs/                   ignored local execution evidence
```

## Boundaries

The factory does not initially:

- run multiple agents concurrently;
- allow agents to merge, push, deploy, or publish releases;
- expose customer data or project secrets;
- choose product behavior without human approval;
- replace deterministic builds, tests, linting, or security scans with model judgment.

## Current proving ground

The first learning target is the separate sanitized reference repository [MailFlow Lab](https://github.com/vothienthanh/mailflow-lab). It is deliberately separated from any commercial brand or private repository. The planned exercise is documented in [docs/mailflow-lab.md](docs/mailflow-lab.md), and the first sample specification is [specs/examples/mailflow-skip-duplicates.md](specs/examples/mailflow-skip-duplicates.md).

Before deriving it from private source, complete [the sanitization checklist](docs/sanitization-checklist.md).

## License

Copyright 2026 BrianV. Licensed under Apache-2.0. Private-source material must pass ownership, third-party license, secret, and personal-data review before it is copied here. See [docs/decisions.md](docs/decisions.md).
