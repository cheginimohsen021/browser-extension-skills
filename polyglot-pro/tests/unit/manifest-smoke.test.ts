import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../manifest.json'), 'utf8')
);

describe('manifest baseline', () => {
  it('uses manifest v3', () => {
    expect(manifest.manifest_version).toBe(3);
  });

  it('contains user-controlled key and privacy-friendly permission set', () => {
    expect(manifest.permissions).toEqual(expect.arrayContaining(['storage', 'activeTab', 'scripting', 'tabs']));
    expect(manifest.host_permissions).toEqual([]);
  });

  it('does not allow broad host access by default', () => {
    expect(JSON.stringify(manifest)).not.toContain('<all_urls>');
    expect(JSON.stringify(manifest)).not.toContain('all_urls');
  });
});
