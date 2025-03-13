// src/routes/orgRoutes.js

import express from 'express';
import SessionChatEvaluationController from '../controllers/SessionChatEvaluationController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/getsessionchat', authenticateToken,SessionChatEvaluationController.listAll);
router.get('/getsessionchat/:id', authenticateToken,SessionChatEvaluationController.getOne);
router.post('/createsession', authenticateToken,SessionChatEvaluationController.create);
router.patch('/updatesession/:id', authenticateToken,SessionChatEvaluationController.update);
router.patch(
  '/sessions/finalize/:id',
  SessionChatEvaluationController.finalize
);


export default router;
