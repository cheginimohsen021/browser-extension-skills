# Design

## Design principles

Polyglot Pro follows a compact, modern interface vocabulary with a strong mobile-first posture. The UI is built to be clear, quiet, and confidence-building for translation, review, and subtitle work.

## Color and type tokens

The early design system includes semantic tokens for:

- accent
- surface
- overlay
- surface-muted
- success
- warning
- danger
- text-primary
- text-secondary

Type follows a fluid scale using `clamp()` and a system stack with script-aware fallbacks.

## Layout model

- Popup: compact, quick-access control center
- Side panel: primary desktop workspace
- Bottom sheet / in-page drawer: Android and Quetta fallback
- Full-page workspace: documents, subtitles, reviews, and export flows

## Accessibility baseline

- Keyboard-first interaction patterns
- Visible focus styles only
- Touch targets no smaller than 48x48 px (practical minimum 44 px when constrained)
- ARIA labels on icon-only controls
- Reduced-motion support
- RTL-aware layout logic and logical CSS properties

## Compatibility and fallback

A `SurfaceAdapter` abstraction is planned so the same UI can render inside popup, side panel, in-page overlay, and options page layouts without duplicating behavior.

## Open decisions

- Real icon asset generation is not yet included; this architecture assumes a later asset generation phase
- No heavy UI framework is yet forced; this phase chooses a minimal, secure, flexible path
- Font selection is purposely deferred until final asset and i18n work begins
