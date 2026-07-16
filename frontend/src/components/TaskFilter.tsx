import { Filter } from '../types';

interface TaskFilterProps {
  value: Filter;
  onChange: (filter: Filter) => void;
}

const FILTERS: Filter[] = ['all', 'completed', 'pending'];

export default function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <div className="task-filter">
      {FILTERS.map((f) => (
        <button key={f} className={value === f ? 'active' : ''} onClick={() => onChange(f)}>
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
