# Contributing

## Code conventions

- Use TypeScript strict mode
- Keep logic behind typed interfaces and explicit capability checks
- Prefer small adapters over direct browser API assumptions
- Keep untrusted content isolated from prompt logic and rendering logic
- Never use remote scripts or `eval()`

## Workflow

1. Implement changes in a feature branch
2. Run compile and tests
3. Update docs when architecture or risk posture changes
4. Avoid claiming production readiness without the quality gate evidence

## Requirements for new features

Every new feature must be justified with a user story and acceptance criteria from the product brief. If a feature is optional, it must be behind a feature flag and default off.
