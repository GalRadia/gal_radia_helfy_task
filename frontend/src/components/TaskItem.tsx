import {Task} from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
    function handleDelete():void{
        if(window.confirm(`Are you sure you want to delete ${task.title}?`)){
            onDelete(task.id);
        }}  
  return (
    <div className={`task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
      <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-item-actions">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label="Mark task completed"
        />
        <button onClick={() => onEdit(task.id)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
    }