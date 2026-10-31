export type SurfaceKind = 'popup' | 'sidepanel' | 'inpage-drawer' | 'options' | 'workspace';

export interface SurfaceCapabilities {
  supportsSidePanel: boolean;
  supportsContextMenus: boolean;
  supportsCommands: boolean;
  supportsOffscreen: boolean;
  supportsAlarms: boolean;
  supportsInPageDrawer: boolean;
}

export const DEFAULT_SURFACE_CAPABILITIES: SurfaceCapabilities = {
  supportsSidePanel: false,
  supportsContextMenus: false,
  supportsCommands: false,
  supportsOffscreen: false,
  supportsAlarms: false,
  supportsInPageDrawer: true
};

export type SurfaceSelection = {
  preferred: SurfaceKind;
  fallback: SurfaceKind[];
};

export function chooseSurface(surfaceCaps: SurfaceCapabilities): SurfaceSelection {
  if (surfaceCaps.supportsSidePanel) {
    return { preferred: 'sidepanel', fallback: ['popup', 'inpage-drawer', 'workspace'] };
  }

  return { preferred: 'popup', fallback: ['inpage-drawer', 'workspace', 'options'] };
}
