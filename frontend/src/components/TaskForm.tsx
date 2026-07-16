import { useState, SubmitEvent } from 'react';
import { Priority, TaskFormValues } from '../types';

interface TaskFormProps {
  initial?: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
  onCancel?: () => void;
}

export default function TaskForm({ initial, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState<string>(initial?.title ?? '');
  const [description, setDescription] = useState<string>(initial?.description ?? '');
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'medium');
  const [dueDate, setDueDate] = useState<string>(initial?.dueDate ?? '');
  const [error, setError] = useState<string>('');

  function handleSubmit(e: SubmitEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    onSubmit({ title, description, priority, dueDate: dueDate || undefined });
    if (!initial) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        <button type="submit">{initial ? 'Save changes' : 'Add task'}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
