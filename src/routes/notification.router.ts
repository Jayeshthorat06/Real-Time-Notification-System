import express from 'express';
import { deleteNotificationByIddetails, getNotificationByIddetails, getNotificationdetails, savenotification } from '../controllers/notification.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/notifications', authMiddleware, savenotification);
router.get('/notifications', authMiddleware, getNotificationdetails);
router.get('/notifications/:id', authMiddleware, getNotificationByIddetails);
router.delete('/notifications/:id', authMiddleware, deleteNotificationByIddetails);

export default router;