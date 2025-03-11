// src/routes/orgRoutes.js

import express from 'express';
import SessionChatEvaluationController from '../controllers/SessionChatEvaluationController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();


routes.get('/getsessionchat', authenticateToken,SessionChatEvaluationController.listAll);
routes.get('/getsessionchat/:id', authenticateToken,SessionChatEvaluationController.getOne);
routes.post('/createsession', authenticateToken,SessionChatEvaluationController.create);
routes.patch('/updatesession/:id', authenticateToken,SessionChatEvaluationController.update);
routes.patch(
  '/sessions/finalize/:id',
  SessionChatEvaluationController.finalize
);


export default router;
