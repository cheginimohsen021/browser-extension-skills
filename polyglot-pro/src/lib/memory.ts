export interface TranslationMemoryEntry {
  id: string;
  sourceText: string;
  targetText: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: number;
  score?: number;
}

export function createTranslationMemoryEntry(
  sourceText: string,
  targetText: string,
  sourceLanguage: string,
  targetLanguage: string
): TranslationMemoryEntry {
  return {
    id: crypto.randomUUID(),
    sourceText,
    targetText,
    sourceLanguage,
    targetLanguage,
    createdAt: Date.now()
  };
}

export function findExactMemoryMatch(
  sourceText: string,
  languagePair: [string, string],
  memory: TranslationMemoryEntry[]
): TranslationMemoryEntry | undefined {
  return memory.find(
    (entry) =>
      entry.sourceLanguage === languagePair[0] &&
      entry.targetLanguage === languagePair[1] &&
      entry.sourceText.trim().toLowerCase() === sourceText.trim().toLowerCase()
  );
}

export function findFuzzyMemoryMatch(
  sourceText: string,
  languagePair: [string, string],
  memory: TranslationMemoryEntry[]
): TranslationMemoryEntry | undefined {
  const normalizedSource = sourceText.trim().toLowerCase();

  let best: TranslationMemoryEntry | undefined;
  let bestScore = 0;

  for (const entry of memory) {
    if (entry.sourceLanguage !== languagePair[0] || entry.targetLanguage !== languagePair[1]) {
      continue;
    }

    const overlap = entry.sourceText.trim().toLowerCase();
    const commonLength = Math.min(overlap.length, normalizedSource.length);
    const score = commonLength > 0 ? (overlap.includes(normalizedSource) ? normalizedSource.length : 0) : 0;

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return best;
}
