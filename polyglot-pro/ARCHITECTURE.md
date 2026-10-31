# Architecture

## Overview

Polyglot Pro is structured around a strict capability-driven architecture. The extension is designed for Chromium-first support with graceful fallback for Firefox and Android forks such as Quetta.

## Runtime model

- Service worker: privileged orchestration, queue, retry, capability registry, model selection, and secure messaging
- Popup: quick translate tools and key management
- Side panel: main desktop workspace when supported
- Fallback surfaces: in-page drawer, bottom sheet, and full-page workspace when `sidePanel` is unavailable
- Options page: settings, profiles, glossary, model registry, usage, and privacy controls
- Content scripts: active-tab page translation and DOM bridges only when user approves a site or action

## Core components

### 1. Capability registry

The extension probes runtime capabilities before enabling UI and permissions. This avoids browser sniffing and keeps us aligned with the requirement: "capability detection, not browser sniffing."

### 2. Provider abstraction

The provider layer is isolated behind an interface so the rest of the system does not depend on raw Gemini fields. The contract includes:

- auth / key lifecycle
- request builder
- streaming or batch handling
- response parsing
- validation and structured output handling
- retry / rate-limit behavior

### 3. Translation engine

The translation engine handles:

- source-language detection
- prompt building
- glossary enforcement
- memory/fuzzy matching
- placeholder protection
- structured validation of output
- segment assembly and diff review

### 4. Document and subtitle stacks

Large file and subtitle workloads are separated into dedicated pipeline modules so they can run in workers/offscreen contexts and be canceled or resumed without blocking the UI thread.

## Security boundaries

- Content scripts must not access keys or privileged actions directly
- Background service worker remains the single privileged boundary
- All IPC payloads are schema validated
- Untrusted text is never executed and is never treated as instructions
- User data is redacted before outbound requests when the user enables that feature

## Storage model

- `chrome.storage.local` / `chrome.storage.session`: settings and small state
- IndexedDB: translation memory, glossaries, subtitle projects, document cache, and large user data
- local only by default; no `storage.sync` for keys

## Risks and mitigations

- Runtime capability variance (Quetta/Android/Firefox): mitigated by a `SurfaceAdapter` and capability registry
- Prompt injection from web content: mitigated by strict prompt-layer separation and placeholder tokens
- Large file or subtitle crashes: mitigated by strict size limits and worker/offscreen processing
- Offscreen / side panel availability issues: mitigated by fallback surface abstraction

## Pending implementation

Phase 1 creates the skeleton; the actual long-lived provider, document, and subtitle modules are intentionally stubbed and will be implemented in later phases.
