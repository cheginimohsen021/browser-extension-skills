import { createTranslationMemoryEntry, findExactMemoryMatch } from './lib/memory';
import { translateWithLocalTemplates } from './lib/translation-engine';
import { DEFAULT_SITE_RULES } from './lib/site-rules';

const sourceInput = document.querySelector('#source-text') as HTMLTextAreaElement | null;
const targetLanguage = document.querySelector('#target-language') as HTMLSelectElement | null;
const displayMode = document.querySelector('#display-mode') as HTMLSelectElement | null;
const resultNode = document.querySelector('#result');
const translateBtn = document.querySelector('#translate-btn');
const resetBtn = document.querySelector('#reset-btn');

const memory: Array<{ sourceText: string; targetText: string; sourceLanguage: string; targetLanguage: string }> = [];

const setResult = (value: string) => {
  if (resultNode) {
    resultNode.textContent = value;
  }
};

translateBtn?.addEventListener('click', () => {
  if (!sourceInput || !targetLanguage) return;

  const text = sourceInput.value.trim();
  if (!text) {
    setResult('Please enter some text first.');
    return;
  }

  const exact = findExactMemoryMatch(text, ['auto', targetLanguage.value], [] as any);
  const memoryResult = exact ?? createTranslationMemoryEntry(text, `${text} [translated:${targetLanguage.value}]`, 'auto', targetLanguage.value);

  memory.push(memoryResult);

  const localResult = translateWithLocalTemplates({
    sourceText: text,
    sourceLanguage: 'auto',
    targetLanguage: targetLanguage.value,
    memory: memory
  });

  if (localResult) {
    setResult(localResult.text);
    return;
  }

  const fallback = text.length > 0 ? `${text} → ${targetLanguage.value}` : 'No result';
  setResult(fallback);
});

resetBtn?.addEventListener('click', () => {
  if (sourceInput) sourceInput.value = '';
  setResult('No translation yet.');
  if (targetLanguage) targetLanguage.value = 'en';
  if (displayMode) displayMode.value = 'replace';
});

chrome.runtime.sendMessage({ type: 'CAPABILITIES_REQUEST' }, (response) => {
  if (response?.ok === false) {
    setResult('The runtime capabilities could not be verified.');
  }
});

console.info('[Polyglot Pro][popup]', { rules: DEFAULT_SITE_RULES.length });
