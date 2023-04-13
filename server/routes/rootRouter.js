import express from 'express';

import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import taskRouter from './taskRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/task', taskRouter);

export default router;
