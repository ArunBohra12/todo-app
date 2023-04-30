import express from 'express';
import authController from '../controllers/authController.js';
import listController from '../controllers/listController.js';

const router = express.Router();

router.use(authController.protect);

router.route('/').get(listController.getAllLists).post(listController.createList);
router.route('/details/:listId').get(listController.getCustomListDetails);
router.route('/add-task/:listId').post(listController.addTaskToList);

export default router;
