import express from 'express';
import morgan from 'morgan';

const server = express();
const morganModule = morgan(':method :url :status :res[content-length] - :response-time ms');

server.use(express.json());
server.use(morganModule);

export default server;
