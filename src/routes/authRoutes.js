// src/routes/authRoutes.js

import express from 'express';
import  login  from '../controllers/authController.js'; // Certifique-se de que o caminho está correto
import SpecialtyLogin from '../controllers/authSpecialtyController.js'

const router = express.Router();

router.post('/', login);
router.post('/specialty', SpecialtyLogin);

export default router; // Exportação padrão para o router
