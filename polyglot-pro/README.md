# Polyglot Pro

This project contains the integrated domain shell for the multilingual document and subtitle processing workflow.

## Included modules

- document models and review states
- subtitle cue parsing
- document and subtitle export helpers
- review task behavior
- translation-request service for the next model-bound integration step
- project store for app-level state management
- workflow and safety guards

## Current status

This is the architecture foundation and integration layer, not a live production translation backend. The next stage is to connect a concrete AI provider, authentication flow, and UI state management.

## Main entry

```ts
import { createDocumentProject, createSubtitleProject } from './src';
```

## Planned next stages

1. Provider integration (OpenAI/Anthropic/Gemini-compatible adapters)
2. Real subtitle translation pipeline with timing-preserving logic
3. Review queue and approval workflow persistence
4. Browser extension or app UI shell integration
5. Deployment and storage configuration
