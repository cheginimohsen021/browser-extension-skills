const REDACTION_PATTERNS = [
  /(?:[A-Za-z0-9._%+-]+)@(?:[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g,
  /\b(?:\+?\d[\d\s().-]{7,}\d)\b/g,
  /(?:ghp|github_pat|sk_live|AIza|AIzaSy|x-goog-api-key)[A-Za-z0-9_\-]{10,}/gi,
  /(?:Bearer\s+)[A-Za-z0-9._~+\-/]+=*/gi,
  /(?:api[_-]?key|token|secret|password)\s*[:=]\s*[\w\-./:=+%]+/gi
];

export function redactSecrets(input: string): string {
  let value = input;
  for (const regex of REDACTION_PATTERNS) {
    value = value.replace(regex, '[REDACTED]');
  }
  return value;
}

export function sanitizeForLogging(value: unknown): string {
  if (typeof value === 'string') {
    return redactSecrets(value);
  }

  if (value === null || value === undefined) {
    return 'null';
  }

  try {
    return redactSecrets(JSON.stringify(value));
  } catch {
    return String(value);
  }
}
