export interface ReviewTask {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  createdAt: number;
}

export function createReviewTask(title: string): ReviewTask {
  return {
    id: crypto.randomUUID(),
    title,
    status: 'pending',
    createdAt: Date.now()
  };
}

export function approveReviewTask(task: ReviewTask, notes?: string): ReviewTask {
  return { ...task, status: 'approved', notes };
}

export function rejectReviewTask(task: ReviewTask, notes?: string): ReviewTask {
  return { ...task, status: 'rejected', notes };
}
