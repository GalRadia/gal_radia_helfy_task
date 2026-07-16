import cors from 'cors';
import express from 'express';
import tasksRouter from './routes/tasks';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'not found' });
});


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
