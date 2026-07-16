import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "./services/api";
import { Task, TaskFormValues, Filter, Priority, SortOption } from "./types";

import "./styles/App.css";
import TaskFilter from "./components/TaskFilter";
import TaskCarousel from "./components/TaskCarousel";

const PRIORITY_WEIGHT: Record<Priority, number> = { high: 3, medium: 2, low: 1 };


export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [editingId, setEditingId] = useState<number | null>(null);
  function load(): void {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch(() => setError("Could not load tasks. Is the backend running?"))
      .finally(() => setLoading(false));
  }
  useEffect(load, []);
  async function handleCreate(values: TaskFormValues): Promise<void> {
    try {
      await createTask(values);
      load();
    } catch {
      setError("Could not create task.");
    }
  }

  async function handleUpdate(values: TaskFormValues): Promise<void> {
    if (editingId == null) return;
    try {
      await updateTask(editingId, values);
      setEditingId(null);
      load();
    } catch {
      setError("Could not update task.");
    }
  }

  async function handleToggle(id: number): Promise<void> {
    try {
      await toggleTask(id);
      load();
    } catch {
      setError("Could not update task.");
    }
  }

  async function handleDelete(id: number): Promise<void> {
    try {
      await deleteTask(id);
      load();
    } catch {
      setError("Could not delete task.");
    }
  }

  const visibleTasks: Task[] = tasks
  .filter((t) => (filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed))
  .filter((t) => `${t.title} ${t.description}`.toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'priority') return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
    const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return sort === 'newest' ? diff : -diff;
  });


  const editingTask: Task | undefined = tasks.find((t) => t.id === editingId);
  return (
    <div className="App">
      <div className="app-header">
        <h1>Task Manager</h1>
      </div>
      {editingTask ? (
        <TaskForm
          key={editingTask.id}
          initial={editingTask}
          onSubmit={handleUpdate}
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <TaskForm onSubmit={handleCreate} />
      )}
      <div className="toolbar">
        <input
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks…"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className="filter-row">
        <TaskFilter value={filter} onChange={setFilter} />
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={load}>Retry</button>
        </div>
      )}
      <TaskCarousel
        tasks={visibleTasks}
        onEdit={(id) => setEditingId(id)}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}
