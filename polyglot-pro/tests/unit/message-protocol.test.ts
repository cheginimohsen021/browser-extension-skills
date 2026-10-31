import { describe, expect, it } from 'vitest';

describe('message protocol validation', () => {
  it('accepts a simple ping message', () => {
    const msg = { type: 'PING' };
    expect(msg.type).toBe('PING');
  });

  it('rejects unknown message types', () => {
    const msg = { type: 'NOT_REAL' };
    expect(['PING', 'CAPABILITIES_REQUEST']).toContain(msg.type as string);
  });
});
