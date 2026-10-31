export type DocumentKind = 'text' | 'markdown' | 'html' | 'json' | 'csv' | 'subtitle' | 'unknown';

export interface DocumentProject {
  id: string;
  title: string;
  kind: DocumentKind;
  mimeType: string;
  sourceText: string;
  createdAt: number;
  updatedAt: number;
  reviewState: 'draft' | 'in-review' | 'translated' | 'exported';
  sourceLanguage?: string;
  targetLanguage?: string;
}

export interface SubtitleCue {
  id: string;
  startMs: number;
  endMs: number;
  text: string;
  translatedText?: string;
  reviewState: 'pending' | 'approved' | 'rejected';
}

export interface SubtitleProject {
  id: string;
  title: string;
  fileName: string;
  cues: SubtitleCue[];
  createdAt: number;
  updatedAt: number;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export function createDocumentProject(
  title: string,
  kind: DocumentKind,
  sourceText: string,
  mimeType = 'text/plain',
  sourceLanguage?: string,
  targetLanguage?: string
): DocumentProject {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    title,
    kind,
    mimeType,
    sourceText,
    createdAt: now,
    updatedAt: now,
    reviewState: 'draft',
    sourceLanguage,
    targetLanguage
  };
}

export function createSubtitleProject(
  title: string,
  fileName: string,
  cues: SubtitleCue[],
  sourceLanguage?: string,
  targetLanguage?: string
): SubtitleProject {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    title,
    fileName,
    cues,
    createdAt: now,
    updatedAt: now,
    sourceLanguage,
    targetLanguage
  };
}

export function estimateDocumentTokens(text: string): number {
  if (!text) return 0;
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 0.75));
}

export function clampReviewState(state: DocumentProject['reviewState']): DocumentProject['reviewState'] {
  const allowed = ['draft', 'in-review', 'translated', 'exported'] as const;
  return allowed.includes(state as typeof allowed[number]) ? state : 'draft';
}
