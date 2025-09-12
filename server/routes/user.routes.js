import express from 'express';
import { loginUser, registerUser,getUserData } from '../controllers/user.controller.js';
import {protect} from '../middlewares/auth.middleware.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUserData)

export default userRouter;