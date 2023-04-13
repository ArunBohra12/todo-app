import express from 'express';

import authController from '../controllers/authController.js';
import taskController from '../controllers/taskController.js';

const router = express.Router();

router.route('/').post(authController.protect, taskController.createTask);

export default router;
