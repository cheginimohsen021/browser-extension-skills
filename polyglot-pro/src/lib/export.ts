export interface ExportResult {
  ok: boolean;
  filename: string;
  content: string;
  mimeType: string;
}

export function exportPlainTextDocument(title: string, content: string): ExportResult {
  return {
    ok: true,
    filename: `${title}.txt`,
    content,
    mimeType: 'text/plain'
  };
}

export function exportSubtitleProject(title: string, cues: Array<{ startMs: number; endMs: number; text: string }>): ExportResult {
  const lines: string[] = [];

  cues.forEach((cue, index) => {
    const start = formatTimestamp(cue.startMs);
    const end = formatTimestamp(cue.endMs);
    lines.push(`${index + 1}`);
    lines.push(`${start} --> ${end}`);
    lines.push(cue.text);
    lines.push('');
  });

  return {
    ok: true,
    filename: `${title}.srt`,
    content: lines.join('\n'),
    mimeType: 'application/x-subrip'
  };
}

function formatTimestamp(ms: number): string {
  const totalMs = Math.max(0, ms);
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const millis = totalMs % 1000;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':') + `,${String(millis).padStart(3, '0')}`;
}
