// src/routes/orgRoutes.js

import express from 'express';
import { createPerfil, getAllPerfil, updatePerfil,deletePerfil } from '../controllers/PerfilController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Rota para criar órgão
router.post('/perfil', authenticateToken, createPerfil);
router.get('/perfil', authenticateToken, getAllPerfil);
router.put('/perfil/:id', authenticateToken, updatePerfil);
router.delete('/perfil/:id', authenticateToken, deletePerfil);

export default router;
