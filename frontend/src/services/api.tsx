import { Task, TaskFormValues } from '../types';
const BASE_URL = 'http://localhost:4000/api/tasks';

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
}
export async function createTask(task: TaskFormValues): Promise<Task> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
}
export async function updateTask(id: number, task: TaskFormValues): Promise<Task> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
}
export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}
export async function toggleTaskCompletion(id: number, completed: boolean): Promise<Task> {
  const response = await fetch(`${BASE_URL}/${id}/toggle`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) {
    throw new Error('Failed to toggle task completion');
  }
  return response.json();
}