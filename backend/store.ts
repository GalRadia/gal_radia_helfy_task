import { Task } from './types';

let tasks: Task[] = []
let nextId = 1;

export function getAll(): Task[] {
  return tasks;
}

export function create(data: Omit<Task, 'id' | 'createdAt'>): Task {
  const task: Task = { id: nextId++, createdAt: new Date(), ...data };
  tasks.push(task);
  return task;
}

export function update(id: number, data: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | undefined {
  const task = tasks.find((t) => t.id === id);
  if (!task) return undefined;
  Object.assign(task, data);
  return task;
}

export function remove(id: number): boolean {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < before;
}

export function toggle(id: number): Task | undefined {
  const task = tasks.find((t) => t.id === id);
  if (!task) return undefined;
  task.completed = !task.completed;
  return task;
}
