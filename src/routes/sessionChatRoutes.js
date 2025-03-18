// src/routes/orgRoutes.js

import express from 'express';
import { listAllSessions, getSessionById, createSession, updateSession, finalizeSession } from '../controllers/sessionChatController.js';
// import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/getsessionchat', listAllSessions);
router.get('/getsessionchat/:id', getSessionById);
router.post('/createsession', createSession);
router.patch('/updatesession/:sessionId', updateSession);
router.patch(
  '/sessions/finalize/:id',
  finalizeSession
);

//rotas 


export default router;
