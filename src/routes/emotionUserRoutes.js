// src/routes/orgRoutes.js

import express from 'express';
import { createEmotionUser, getEmotionsByUser, updateEmotionUser, deleteEmotionUser  } from '../controllers/emotionUserController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Rota para criar órgão
router.post('/emotionUser', createEmotionUser);
router.get('/emotionsUser/:user_id', authenticateToken, getEmotionsByUser);
router.put('/emotionUser/:id', authenticateToken, updateEmotionUser);
router.delete('/emotionUser/:id', authenticateToken, deleteEmotionUser);

export default router;
