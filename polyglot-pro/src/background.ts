import { defineBackground } from 'wxt/utils/define-background';
import { getCapabilities } from './lib/capabilities';

export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    console.info('[Polyglot Pro] installed');
  });

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    switch (message.type) {
      case 'PING':
        sendResponse({ ok: true, message: 'Polyglot Pro background is ready.' });
        return true;
      case 'CAPABILITIES_REQUEST':
        sendResponse(getCapabilities());
        return true;
      default:
        return false;
    }
  });
});
