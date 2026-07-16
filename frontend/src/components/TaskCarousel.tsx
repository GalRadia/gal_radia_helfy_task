import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskCarouselProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}


export default function TaskCarousel({ tasks, onToggle, onEdit, onDelete }: TaskCarouselProps) {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    setIndex(0);
  }, [tasks.length]);


  if (tasks.length === 0) {
    return <div className="task-list-empty">No tasks yet, add one above.</div>;
  }

  function prev(): void {
    setDirection('left');
    setIndex((i) => (i - 1 + tasks.length) % tasks.length);
  }

  function next(): void {
    setDirection('right');
    setIndex((i) => (i + 1) % tasks.length);
  }

  return (
    <div className="task-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <button onClick={prev} disabled={tasks.length < 2} aria-label="Previous task">
        &#8249;
      </button>
      <div className="task-carousel-viewport">
        <div key={tasks[index].id} className={`task-carousel-slide slide-${direction}`}>
          <TaskItem task={tasks[index]} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
      <button onClick={next} disabled={tasks.length < 2} aria-label="Next task">
        &#8250;
      </button>
    </div>
  );
}
