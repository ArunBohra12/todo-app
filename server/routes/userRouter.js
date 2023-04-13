import express from 'express';
import authController from '../controllers/authController.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', authController.protect, userController.getProfile);

export default router;
