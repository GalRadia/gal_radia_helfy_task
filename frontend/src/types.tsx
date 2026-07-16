export type Priority = 'low' | 'medium' | 'high';
export type Filter = 'all' | 'completed' | 'pending';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // arrives as an ISO string over JSON, not a Date instance
  priority: Priority;
  dueDate?: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  priority: Priority;
  dueDate?: string;
}
