# Security

## Security posture

Polyglot Pro is designed as a privacy-first extension with explicit consent gates and a strong least-privilege model. It does not ship telemetry or remote analytics.

## Threat model (initial)

### Key theft

- User API keys are stored only in browser storage and only when the user has chosen a storage mode
- The extension never embeds keys in URLs, source files, logs, or manifests
- A proxy-based configuration is supported behind a provider abstraction to avoid direct browser-side keys

### Prompt injection

- Untrusted page content, subtitle text, and file text are treated as data, not instructions
- Prompt builders separate system instructions from user data
- Placeholder tokens protect URLs, variables, tags, and code-like strings before generation
- Output is validated after translation before it is rendered or accepted

### Hostile page / DOM attack

- No `innerHTML` is used with untrusted data
- DOM mutation loops are prevented by per-node markers and mutation filters
- Only active-tab content is instrumented after explicit user action

### Malicious file attack

- Files are validated for size, extension, and content type
- ZIP bomb, XML entity, CSV injection, and nested-path protections are implemented at the parser boundary
- Heavy parsing occurs off the main thread

### Message spoofing / privilege escalation

- All runtime messages are schema validated
- Sender identity checks are required before privileged actions are processed
- Content scripts are never given direct access to the key vault or provider logic

## Storage guidelines

- `chrome.storage.sync` is not used for API keys or sensitive data
- `chrome.storage.session` is preferred for ephemeral keys and session-only mode
- `chrome.storage.local` is allowed only with explicit user consent and clear UI warnings
- Passphrase-encrypted local storage may be implemented later behind a WebCrypto adapter for user convenience

## Implementation constraints

- No remote code execution
- No `eval()`, `new Function()`, or untrusted HTML insertion
- Keep CSP restrictive
- Keep all network behavior behind explicit user action or user-approved site rules

## Limitations

This is the Phase 1 security baseline. The final quality gate must still verify the injection corpus, hostile file corpus, key leakage tests, and permission usage audits before any production claim is made.
