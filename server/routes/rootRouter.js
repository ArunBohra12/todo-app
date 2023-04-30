import express from 'express';

import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import taskRouter from './taskRouter.js';
import listRouter from './listRoutes.js';
import smartListRouter from './smartListRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/task', taskRouter);
router.use('/list', listRouter);
router.use('/smart-list', smartListRouter);

export default router;
