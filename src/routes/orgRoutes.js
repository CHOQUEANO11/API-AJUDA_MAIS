// src/routes/orgRoutes.js

import express from 'express';
import { createOrg, getAllOrgs, updateOrg, deleteOrg } from '../controllers/orgController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Rota para criar órgão
router.post('/org', createOrg);
router.get('/orgs', authenticateToken, getAllOrgs);
router.put('/org/:id', authenticateToken, updateOrg);
router.delete('/org/:id', authenticateToken, deleteOrg);

export default router;
