import { defineConfig } from 'wxt';

export default defineConfig({
  extensionApi: 'chrome',
  browser: 'chrome',
  manifest: {
    name: 'Polyglot Pro',
    version: '0.1.0',
    description:
      'Translate pages, documents, and subtitles using Gemini with explicit user consent.',
    permissions: ['storage', 'activeTab', 'scripting', 'tabs'],
    host_permissions: [],
    optional_permissions: ['sidePanel', 'contextMenus', 'alarms', 'offscreen'],
    action: {
      default_title: 'Polyglot Pro',
      default_popup: 'popup.html'
    },
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self';"
    },
    icons: {
      16: 'icons/icon.svg',
      48: 'icons/icon.svg',
      128: 'icons/icon.svg'
    }
  }
});
