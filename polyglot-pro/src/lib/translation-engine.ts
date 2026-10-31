import { applyGlossary, type GlossaryEntry } from './glossary';
import { findExactMemoryMatch, findFuzzyMemoryMatch, type TranslationMemoryEntry } from './memory';

export interface TranslationEngineRequest {
  sourceText: string;
  sourceLanguage?: string;
  targetLanguage: string;
  glossary?: GlossaryEntry[];
  memory?: TranslationMemoryEntry[];
  style?: string;
  avoidProviderFallback?: boolean;
}

export interface TranslationEngineResult {
  text: string;
  sourceLanguage?: string;
  targetLanguage: string;
  usedMemory?: boolean;
  usedGlossary?: boolean;
  providerFallback?: boolean;
}

export function translateWithLocalTemplates(
  req: TranslationEngineRequest
): TranslationEngineResult | null {
  const exactMatch = req.memory
    ? findExactMemoryMatch(req.sourceText, [req.sourceLanguage ?? 'auto', req.targetLanguage], req.memory)
    : undefined;

  if (exactMatch) {
    return {
      text: exactMatch.targetText,
      sourceLanguage: exactMatch.sourceLanguage,
      targetLanguage: exactMatch.targetLanguage,
      usedMemory: true,
      providerFallback: false
    };
  }

  const fuzzyMatch = req.memory
    ? findFuzzyMemoryMatch(req.sourceText, [req.sourceLanguage ?? 'auto', req.targetLanguage], req.memory)
    : undefined;

  if (fuzzyMatch) {
    return {
      text: fuzzyMatch.targetText,
      sourceLanguage: fuzzyMatch.sourceLanguage,
      targetLanguage: fuzzyMatch.targetLanguage,
      usedMemory: true,
      providerFallback: false
    };
  }

  if (req.glossary && req.glossary.length > 0) {
    const textWithGlossary = applyGlossary(req.sourceText, req.glossary);
    return {
      text: textWithGlossary,
      sourceLanguage: req.sourceLanguage,
      targetLanguage: req.targetLanguage,
      usedGlossary: true,
      providerFallback: true
    };
  }

  return null;
}

export function createTranslationEngineResult(
  text: string,
  targetLanguage: string,
  sourceLanguage?: string,
  usedMemory = false,
  usedGlossary = false,
  providerFallback = false
): TranslationEngineResult {
  return {
    text,
    sourceLanguage,
    targetLanguage,
    usedMemory,
    usedGlossary,
    providerFallback
  };
}
