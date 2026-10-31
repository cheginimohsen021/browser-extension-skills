import type {
  DocumentProject,
  SubtitleProject,
  SubtitleCue,
} from '@/lib/documents';

export interface ProjectStore {
  documents: Map<string, DocumentProject>;
  subtitles: Map<string, SubtitleProject>;
}

export function createProjectStore(): ProjectStore {
  return {
    documents: new Map(),
    subtitles: new Map(),
  };
}

export function saveDocumentProject(
  store: ProjectStore,
  project: DocumentProject,
): DocumentProject {
  store.documents.set(project.id, project);
  return project;
}

export function saveSubtitleProject(
  store: ProjectStore,
  project: SubtitleProject,
): SubtitleProject {
  store.subtitles.set(project.id, project);
  return project;
}

export function getDocumentProject(
  store: ProjectStore,
  id: string,
): DocumentProject | undefined {
  return store.documents.get(id);
}

export function getSubtitleProject(
  store: ProjectStore,
  id: string,
): SubtitleProject | undefined {
  return store.subtitles.get(id);
}

export function listDocumentProjects(store: ProjectStore): DocumentProject[] {
  return [...store.documents.values()];
}

export function listSubtitleProjects(store: ProjectStore): SubtitleProject[] {
  return [...store.subtitles.values()];
}

export function updateSubtitleCue(
  project: SubtitleProject,
  cueId: string,
  patch: Partial<SubtitleCue>,
): SubtitleProject {
  const nextCues = project.cues.map((cue) =>
    cue.id === cueId ? { ...cue, ...patch } : cue,
  );

  return {
    ...project,
    cues: nextCues,
    updatedAt: Date.now(),
  };
}
