#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('.', import.meta.url).pathname, '..');
const manifestPath = path.join(root, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const forbidden = ['eval(', 'new Function', 'all_urls', 'unsafe-eval', 'http://'];
const found = forbidden.filter((needle) => JSON.stringify(manifest).includes(needle));

if (found.length > 0) {
  console.error(`Found disallowed content in manifest: ${found.join(', ')}`);
  process.exit(1);
}

console.log('Manifest baseline checks passed.');
