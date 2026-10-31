export interface GlossaryEntry {
  id: string;
  source: string;
  target: string;
  context?: string;
  createdAt: number;
}

export interface GlossaryDocument {
  name: string;
  entries: GlossaryEntry[];
}

export function createGlossaryEntry(source: string, target: string, context?: string): GlossaryEntry {
  return {
    id: crypto.randomUUID(),
    source,
    target,
    context,
    createdAt: Date.now()
  };
}

export function normalizeGlossaryTerms(entries: GlossaryEntry[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const entry of entries) {
    const key = entry.source.trim().toLowerCase();
    if (!key) continue;
    map.set(key, entry.target);
  }

  return map;
}

export function applyGlossary(text: string, entries: GlossaryEntry[]): string {
  const map = normalizeGlossaryTerms(entries);

  let result = text;
  for (const [source, target] of map.entries()) {
    const regex = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    result = result.replace(regex, target);
  }

  return result;
}
