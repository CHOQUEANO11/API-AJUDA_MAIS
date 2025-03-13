// src/routes/orgRoutes.js

import express from 'express';
import SessionChatEvaluationController from '../controllers/sessionChatEvaluationController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/getsessionchat',SessionChatEvaluationController.listAll);
router.get('/getsessionchat/:id',SessionChatEvaluationController.getOne);
router.post('/createsession',SessionChatEvaluationController.create);
router.patch('/updatesession/:id',SessionChatEvaluationController.update);
router.patch(
  '/sessions/finalize/:id',
  SessionChatEvaluationController.finalize
);


export default router;
