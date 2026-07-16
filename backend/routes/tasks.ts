import { Router, Request, Response } from 'express';
import { getAll, create, update, remove, toggle } from '../store';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json(getAll());
});

router.post('/', (req: Request, res: Response) => {
  const { title, description = '', priority = 'medium', dueDate } = req.body;
  const task = create({ title, description, priority, dueDate, completed: false });
  res.status(201).json(task);
});

router.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = update(id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'task not found' });
    return;
  }
  res.json(updated);
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = remove(id);
  if (!ok) {
    res.status(404).json({ error: 'task not found' });
    return;
  }
  res.status(204).send();
});

router.patch('/:id/toggle', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = toggle(id);
  if (!task) {
    res.status(404).json({ error: 'task not found' });
    return;
  }
  res.json(task);
});

export default router;
