import express from 'express';
import { TaskController } from '../controllers/task.controllers.js';

const taskRouter = express.Router();
const { getById, createTask, deleteTask, updateTask } = TaskController;

taskRouter
  .get('/api/task', getById)
  .post('/api/task', createTask)
  .delete('/api/task/:id', deleteTask)
  .patch('/api/task/:id', updateTask);

export default taskRouter;
