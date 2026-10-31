export interface WorkflowState {
  status: 'idle' | 'ready' | 'processing' | 'error';
  message: string;
}

export function createWorkflowState(
  status: WorkflowState['status'] = 'idle',
  message = 'Workflow initialized.',
): WorkflowState {
  return { status, message };
}

export function nextWorkflowStep(
  current: WorkflowState,
  nextStatus: WorkflowState['status'],
  nextMessage: string,
): WorkflowState {
  return {
    status: nextStatus,
    message: nextMessage,
  };
}

export function validateProcessingChain(): WorkflowState {
  return {
    status: 'ready',
    message: 'Document, subtitle, review, and export stages are connected in the scaffold.',
  };
}
