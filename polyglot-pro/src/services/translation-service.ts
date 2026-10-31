import type { DocumentProject } from '@/lib/documents';

export interface TranslationRequest {
  projectId: string;
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  mode: 'document' | 'subtitle';
}

export interface TranslationResponse {
  ok: boolean;
  translatedText?: string;
  message?: string;
  warnings?: string[];
}

export function createTranslationRequest(
  projectId: string,
  sourceText: string,
  sourceLanguage: string,
  targetLanguage: string,
  mode: TranslationRequest['mode'] = 'document',
): TranslationRequest {
  return {
    projectId,
    sourceText,
    sourceLanguage,
    targetLanguage,
    mode,
  };
}

export function translateDocumentText(
  request: TranslationRequest,
): TranslationResponse {
  const trimmed = request.sourceText.trim();

  if (!trimmed) {
    return {
      ok: false,
      message: 'Source text is empty.',
      warnings: ['Translation requires non-empty input.'],
    };
  }

  if (request.sourceLanguage === request.targetLanguage) {
    return {
      ok: true,
      translatedText: trimmed,
      warnings: ['Source and target languages match; no translation needed.'],
    };
  }

  const translated = `${trimmed}\n\n[Translated from ${request.sourceLanguage} to ${request.targetLanguage}]`;

  return {
    ok: true,
    translatedText: translated,
    warnings: ['This is a scaffolded translation result; connect a real model provider in the next integration step.'],
  };
}

export function prepareDocumentForReview(
  project: DocumentProject,
  translatedText: string,
): { reviewReady: boolean; nextState: DocumentProject['reviewState'] } {
  return {
    reviewReady: translatedText.length > 0,
    nextState: translatedText.length > 0 ? 'in-review' : 'draft',
  };
}
