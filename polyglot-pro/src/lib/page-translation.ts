export type DisplayMode = 'replace' | 'bilingual' | 'hover' | 'tooltip';

export const POLYGLOT_STATE_ATTRIBUTE = 'data-polyglot-state';
export const POLYGLOT_ORIGINAL_ATTRIBUTE = 'data-polyglot-original';
export const POLYGLOT_TRANSLATED_ATTRIBUTE = 'data-polyglot-translated';

export interface PageTranslationJob {
  targetLanguage: string;
  displayMode: DisplayMode;
  sourceLanguage?: string;
}

export interface PageTranslationState {
  mode: DisplayMode;
  targetLanguage: string;
  sourceLanguage?: string;
  restoreMap: WeakMap<Text, string>;
}

export function isTranslatableNode(node: Node): boolean {
  if (!(node instanceof Text)) {
    return false;
  }

  const parent = node.parentElement;
  if (!parent) {
    return false;
  }

  if (parent.closest('script, style, noscript, textarea, input, select, option, code, pre, svg, math')) {
    return false;
  }

  if (parent.closest('[translate="no"], .notranslate, [class*="notranslate"], [data-polyglot-ignore]')) {
    return false;
  }

  const value = node.textContent ?? '';
  return value.trim().length > 0 && !/^\s+$/.test(value);
}

export function getNodeLanguage(node: Node): string | undefined {
  const parent = node.parentElement ?? (node as Element).ownerDocument?.documentElement;
  return parent?.closest('[lang]')?.getAttribute('lang') ?? document.documentElement.lang || undefined;
}

export function createPageTranslationState(job: PageTranslationJob): PageTranslationState {
  return {
    mode: job.displayMode,
    targetLanguage: job.targetLanguage,
    sourceLanguage: job.sourceLanguage ?? getNodeLanguage(document.body) ?? 'auto',
    restoreMap: new WeakMap<Text, string>()
  };
}

export function captureOriginalText(node: Text): string {
  const original = node.textContent ?? '';
  node.setAttribute(POLYGLOT_ORIGINAL_ATTRIBUTE, original);
  return original;
}

export function restoreOriginalText(node: Text): void {
  const original = node.getAttribute(POLYGLOT_ORIGINAL_ATTRIBUTE);
  if (!original) return;
  node.textContent = original;
  node.removeAttribute(POLYGLOT_ORIGINAL_ATTRIBUTE);
  node.removeAttribute(POLYGLOT_TRANSLATED_ATTRIBUTE);
  node.setAttribute(POLYGLOT_STATE_ATTRIBUTE, 'restored');
}

export function applyTranslationToTextNode(node: Text, translatedText: string): void {
  if (!isTranslatableNode(node)) return;
  const original = captureOriginalText(node);
  if (!original) return;
  node.textContent = translatedText;
  node.setAttribute(POLYGLOT_TRANSLATED_ATTRIBUTE, translatedText);
  node.setAttribute(POLYGLOT_STATE_ATTRIBUTE, 'translated');
}

export function collectTextNodes(root: ParentNode): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const current = walker.currentNode;
    if (isTranslatableNode(current)) {
      nodes.push(current as Text);
    }
  }

  return nodes;
}

export function schedulePageTranslation(job: PageTranslationJob): void {
  const state = createPageTranslationState(job);
  const nodes = collectTextNodes(document.body || document.documentElement);

  for (const node of nodes) {
    const original = captureOriginalText(node);
    if (!original) continue;
    node.setAttribute(POLYGLOT_STATE_ATTRIBUTE, 'queued');
    state.restoreMap.set(node, original);
  }

  // This is intentionally a shell layer. The actual provider call is deferred to a later phase.
  for (const node of nodes) {
    if (node.textContent) {
      node.setAttribute(POLYGLOT_STATE_ATTRIBUTE, 'ready');
    }
  }
}
