# Testing

## Phase 1 testing goal

This phase ensures the project scaffolding is structurally valid and that the baseline safety checks are in place.

## Checks to run

```bash
npm install
npm run compile
npm test
```

## Planned test matrix for later phases

- Unit tests for parsing, placeholder protection, glossary validation, retry logic
- Integration tests with a mocked Gemini server
- Browser tests covering page translation, restore, SPA mutation, and subtitle overlay timing
- Accessibility and RTL checks via automated tooling
- Security tests for injection and hostile file handling
- Performance budgets for popup, content-script injection, and large-file handling

## Important limitation

No live Gemini API calls or real browser extension behavior are being claimed in this Phase 1 scaffold. Those must be validated in later phases with executable evidence.
