import express from 'express';
import { TaskController } from '../controllers/task.controllers.js';
import { validateTokenMiddleware } from '../middleware/auth.middleware.js';

const { getAllData } = TaskController;
const taskAdminRouter = express.Router();

taskAdminRouter.get('/api/jwtoken/tasks', validateTokenMiddleware, getAllData);
export default taskAdminRouter;
