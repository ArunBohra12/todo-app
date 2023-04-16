import express from 'express';

import authController from '../controllers/authController.js';
import taskController from '../controllers/taskController.js';

const router = express.Router();

// All routes below this will be protected
router.use(authController.protect);

// :id param in the following routes refers to task ids
router.route('/').get(taskController.getAllTasks).post(taskController.createTask);
router.route('/complete/:id').get(taskController.completeTask);
router.route('/:id').delete(taskController.removeTask);

router.route('/steps/:id').post(taskController.addStepToTask).delete(taskController.removeTaskStep);
router.route('/steps/complete/:id').post(taskController.completeTaskStep);

export default router;
