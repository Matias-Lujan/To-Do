import express from 'express';
import morgan from 'morgan';
import taskRouter from './routers/task.router.js';
import userRouter from './routers/user.router.js';
import jwtRouter from './routers/admin.router.js';
import taskAdminRouter from './routers/task-admin.router.js';

const server = express();
const morganModule = morgan(':method :url :status :res[content-length] - :response-time ms');

server.use(express.json());
server.use(morganModule);
server.use(taskRouter);
server.use(userRouter);
//middleware para login con jwt
server.use(jwtRouter);
server.use(taskAdminRouter);

export default server;
