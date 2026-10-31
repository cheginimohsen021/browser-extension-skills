export interface ParseResult<T> {
  ok: boolean;
  value?: T;
  error?: string;
}

export function parseTextDocument(input: string): ParseResult<string> {
  if (!input || input.trim().length === 0) {
    return { ok: false, error: 'Input is empty.' };
  }

  return { ok: true, value: input };
}

export function parseSubtitleCues(rawText: string): ParseResult<Array<{ startMs: number; endMs: number; text: string }>> {
  const lines = rawText.split(/\r?\n/);
  const cues: Array<{ startMs: number; endMs: number; text: string }> = [];

  for (const line of lines) {
    const match = line.match(/^(\d+):(\d{2}):(\d{2}),(\d{1,3})\s+-->\s+(\d+):(\d{2}):(\d{2}),(\d{1,3})\s*(.*)$/);
    if (!match) continue;

    const [, sh, sm, ss, ms, eh, em, es, esm, text] = match;
    const startMs = ((Number(sh) * 3600 + Number(sm) * 60 + Number(ss)) * 1000) + Number(ms);
    const endMs = ((Number(eh) * 3600 + Number(em) * 60 + Number(es)) * 1000) + Number(esm);

    if (text.trim()) {
      cues.push({ startMs, endMs, text: text.trim() });
    }
  }

  return cues.length > 0 ? { ok: true, value: cues } : { ok: false, error: 'No subtitle cues detected.' };
}

export function validateDocumentSafety(input: string): boolean {
  if (input.length > 2_000_000) {
    return false;
  }

  const forbidden = ['<script', 'javascript:', 'data:text/html'];
  return !forbidden.some((token) => input.toLowerCase().includes(token));
}
