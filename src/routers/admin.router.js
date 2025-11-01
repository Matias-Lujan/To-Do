import expres from 'express';
import { loginAdmin } from '../controllers/admin.login.controllers.js';

const jwtRouter = expres.Router();

jwtRouter.post('/user/login', loginAdmin);

export default jwtRouter;

