import express from 'express';
import { UserController } from '../controllers/user.controllers.js';

const userRouter = express.Router();
const { getById, createUser, deleteUser, updateUser } = UserController;

userRouter
  .get('/api/user', getById)
  .post('/api/user', createUser)
  .delete('/api/user/:id', deleteUser)
  .patch('/api/user/:id', updateUser);

export default userRouter;
