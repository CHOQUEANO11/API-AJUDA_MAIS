// src/routes/orgRoutes.js

import express from 'express';
import { createEmotion, getEmotions, updateEmotion, deleteEmotion  } from '../controllers/emotionController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Rota para criar órgão
router.post('/emotion', createEmotion);
router.get('/emotions', authenticateToken, getEmotions);
router.put('/emotion/:id', authenticateToken, updateEmotion);
router.delete('/emotion/:id', authenticateToken, deleteEmotion);

export default router;
