export type CapabilityFlags = {
  hasSidePanel: boolean;
  hasContextMenus: boolean;
  hasCommands: boolean;
  hasOffscreen: boolean;
  hasAlarms: boolean;
  supportsDocumentTitleAccess: boolean;
  supportsSelectionApi: boolean;
  supportsSpeechSynthesis: boolean;
  supportsClipboardWrite: boolean;
  supportsVideoFrameCallback: boolean;
};

export function getCapabilities(): CapabilityFlags {
  return {
    hasSidePanel: typeof chrome !== 'undefined' && !!chrome.sidePanel,
    hasContextMenus: typeof chrome !== 'undefined' && !!chrome.contextMenus,
    hasCommands: typeof chrome !== 'undefined' && !!chrome.commands,
    hasOffscreen: typeof chrome !== 'undefined' && !!chrome.offscreen,
    hasAlarms: typeof chrome !== 'undefined' && !!chrome.alarms,
    supportsDocumentTitleAccess: typeof document !== 'undefined' && typeof document.title === 'string',
    supportsSelectionApi: typeof document !== 'undefined' && !!document.getSelection,
    supportsSpeechSynthesis: typeof speechSynthesis !== 'undefined',
    supportsClipboardWrite: typeof navigator !== 'undefined' && !!navigator.clipboard?.writeText,
    supportsVideoFrameCallback: typeof requestVideoFrameCallback !== 'undefined'
  };
}
