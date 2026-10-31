# Polyglot Pro

Polyglot Pro is a Chromium-first translation and review extension designed for page translation, document work, and subtitle localization using user-supplied Gemini keys.

## Current status

This repository is the Phase 1 foundation only. It includes project structure, manifest configuration, design documentation, CI/security scaffolding, provider shell abstractions, and versioned test scaffolding. It is not yet a production store bundle.

## Project goals

- Translate pages safely and reversibly
- Support quick text translation and review workflows
- Handle documents and subtitles with strong validation
- Keep secrets in user-controlled storage and explicit consent flows
- Maintain Chromium-first capability detection with graceful fallback

## Phase 1 scope

- manifest and permission baseline
- model/provider abstraction skeleton
- key vault and consent flow shell
- security-first docs and threat model
- test and CI scaffolding
- UI surface architecture and fallback design plan

## Development scripts

```bash
npm install
npm run compile
npm test
npm run build
```

## Project tree

```text
polyglot-pro/
├── manifest.json
├── wxt.config.ts
├── package.json
├── tsconfig.json
├── README.md
├── ARCHITECTURE.md
├── SECURITY.md
├── DESIGN.md
├── TESTING.md
├── CONTRIBUTING.md
├── src/
│   ├── background.ts
│   ├── popup.html
│   ├── popup.ts
│   ├── options.html
│   ├── options.ts
│   ├── styles.css
│   └── lib/
│       └── capabilities.ts
├── tests/
│   └── unit/
│       └── manifest-smoke.test.ts
├── scripts/
│   └── check-manifest.mjs
├── icons/
│   ├── icon.svg
│   └── README.md
└── .gitignore
```

## Important notes

- Gemini model names and capabilities are not hard-coded beyond a clearly labelled emergency fallback. Model discovery must be verified against official docs and runtime metadata.
- No user data is sent until explicit action occurs.
- No broad host permissions are requested by default.
- This project is intentionally conservative and intentionally avoids claims of production readiness before the full quality gate passes.
