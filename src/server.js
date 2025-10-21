import express from 'express';
import morgan from 'morgan';
import taskRouter from './routers/task.router.js';

const server = express();
const morganModule = morgan(':method :url :status :res[content-length] - :response-time ms');

server.use(express.json());
server.use(morganModule);
server.use(taskRouter);

export default server;
