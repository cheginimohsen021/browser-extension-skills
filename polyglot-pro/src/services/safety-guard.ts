export interface SafetyCheckResult {
  ok: boolean;
  message: string;
  reasons: string[];
}

export function runSafetyCheck(rawContent: string): SafetyCheckResult {
  const lower = rawContent.toLowerCase();
  const reasons: string[] = [];

  if (rawContent.length > 2_000_000) {
    reasons.push('Document exceeds the safe processing limit.');
  }

  const forbidden = ['<script', 'javascript:', 'data:text/html'];
  for (const token of forbidden) {
    if (lower.includes(token)) {
      reasons.push(`Blocked token detected: ${token}`);
    }
  }

  return {
    ok: reasons.length === 0,
    message: reasons.length === 0 ? 'Content is safe for processing.' : 'Content triggered a safety guard.',
    reasons,
  };
}
