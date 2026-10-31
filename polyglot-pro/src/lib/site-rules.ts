export type DisplayMode = 'replace' | 'bilingual' | 'hover' | 'tooltip';

export interface SiteRule {
  origin: string;
  displayMode: DisplayMode;
  sourceLanguage?: string;
  targetLanguage?: string;
  alwaysTranslate?: boolean;
  neverTranslate?: boolean;
  glossaryKey?: string;
  updatedAt: number;
}

export const DEFAULT_SITE_RULES: SiteRule[] = [];

export function getOriginKey(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return 'unknown';
  }
}

export function getSiteRule(url: string, rules: SiteRule[] = DEFAULT_SITE_RULES): SiteRule | undefined {
  const origin = getOriginKey(url);
  return rules.find((rule) => rule.origin === origin);
}

export function shouldTranslatePage(url: string, rules: SiteRule[] = DEFAULT_SITE_RULES): boolean {
  const rule = getSiteRule(url, rules);
  if (!rule) return false;
  if (rule.neverTranslate) return false;
  return rule.alwaysTranslate || true;
}
