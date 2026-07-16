export type Priority = 'low' | 'medium' | 'high';
export type Filter = 'all' | 'completed' | 'pending';
export type SortOption = 'newest' | 'oldest' | 'priority' | 'title';
export type Theme = 'light' | 'dark';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; 
  priority: Priority;
  dueDate?: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  priority: Priority;
  dueDate?: string;
}
