// src/routes/orgRoutes.js

import express from 'express';
import SessionChatEvaluationController from '../controllers/SessionChatEvaluationController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();


routes.post('/createsessionchat', authenticateToken, SessionChatEvaluationController.store);
routes.get('/getsessionchat', authenticateToken, SessionChatEvaluationController.show);


export default router;
