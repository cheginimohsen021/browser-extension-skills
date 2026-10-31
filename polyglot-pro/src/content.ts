import { getCapabilities } from './capabilities';
import { chooseSurface, DEFAULT_SURFACE_CAPABILITIES } from './surfaces';
import { schedulePageTranslation } from './page-translation';
import { redactSecrets } from './privacy';

const allowedMessageTypes = new Set(['PAGE_TRANSLATE', 'CAPABILITIES_REQUEST']);

let mutationObserver: MutationObserver | null = null;

function isSafePageText(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && value.length < 200000;
}

function setupMutationObserver(): void {
  if (mutationObserver || typeof MutationObserver === 'undefined') return;

  mutationObserver = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'childList') {
        const added = record.addedNodes;
        for (const node of added) {
          if (node instanceof Text) {
            node.textContent = redactSecrets(node.textContent ?? '');
          }
        }
      }
    }
  });

  mutationObserver.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

function handlePageTranslationMessage(message: unknown): boolean {
  if (!message || typeof message !== 'object' || !('type' in message)) {
    return false;
  }

  const typed = message as Record<string, unknown>;
  if (!allowedMessageTypes.has(String(typed.type))) {
    return false;
  }

  if (typed.type === 'CAPABILITIES_REQUEST') {
    return true;
  }

  if (typed.type === 'PAGE_TRANSLATE') {
    const targetLanguage = typed.payload && typeof (typed.payload as Record<string, unknown>).targetLanguage === 'string'
      ? String((typed.payload as Record<string, unknown>).targetLanguage)
      : 'en';

    const displayMode = typed.payload && typeof (typed.payload as Record<string, unknown>).displayMode === 'string'
      ? String((typed.payload as Record<string, unknown>).displayMode)
      : 'replace';

    if (!isSafePageText((typed.payload as Record<string, unknown>).sourceText as string)) {
      return false;
    }

    schedulePageTranslation({
      targetLanguage,
      displayMode: displayMode as 'replace' | 'bilingual' | 'hover' | 'tooltip',
      sourceLanguage: typed.payload && typeof (typed.payload as Record<string, unknown>).sourceLanguage === 'string'
        ? String((typed.payload as Record<string, unknown>).sourceLanguage)
        : undefined
    });

    return true;
  }

  return false;
}

// This shell intentionally avoids remote or unverified translation logic.
// Real provider orchestration is added in a later phase.

const capabilities = getCapabilities();
const surface = chooseSurface({
  ...DEFAULT_SURFACE_CAPABILITIES,
  supportsSidePanel: capabilities.hasSidePanel,
  supportsContextMenus: capabilities.hasContextMenus,
  supportsCommands: capabilities.hasCommands,
  supportsOffscreen: capabilities.hasOffscreen,
  supportsAlarms: capabilities.hasAlarms,
  supportsInPageDrawer: true
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupMutationObserver();
    console.info('[Polyglot Pro][page]', { surface, capabilities });
  }, { once: true });
} else {
  setupMutationObserver();
  console.info('[Polyglot Pro][page]', { surface, capabilities });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const allowed = handlePageTranslationMessage(message);
  sendResponse({ ok: allowed, surface: surface.preferred });
  return allowed;
});
