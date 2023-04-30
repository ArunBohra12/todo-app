import express from 'express';

import authController from '../controllers/authController.js';
import smartListController from '../controllers/smartListController.js';

const router = express.Router();

router.use(authController.protect);

router.get('/get-all-tasks/:type', smartListController.getAllSmartListTasks);

export default router;
