// src/routes/specialtyRoutes.js

import express from 'express';
import { createSpecialty, getSpecialty, getSpecialtiesByOrgao, updateSpecialty, deleteSpecialty } from '../controllers/specialtyController.js'; 
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Rota para criar uma especialidade
router.post('/specialty', authenticateToken, createSpecialty);
router.get('/specialty', authenticateToken, getSpecialty);
router.get('/specialty/:orgao_id', authenticateToken, getSpecialtiesByOrgao);
router.put('/specialty/:id', authenticateToken, updateSpecialty);
router.delete('/specialty/:id', authenticateToken, deleteSpecialty);



// Exportação padrão
export default router;
