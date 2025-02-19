// src/routes/orgRoutes.js

import express from 'express';
import { createSchedule, getSchedules, getSchedulesBySpecialty, updateSchedule, deleteSchedule, getUserSchedules, getSchedulesByUser } from '../controllers/scheduleController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Rota para criar órgão
router.post('/schedule', authenticateToken, createSchedule);
router.get('/schedule', authenticateToken, getSchedules);
router.get('/schedule/:specialty_id', authenticateToken, getSchedulesBySpecialty);
router.get('/schedu/:user_id', authenticateToken, getSchedulesByUser);
router.get('/schedules/:orgao_id', getUserSchedules);
router.put('/schedule/:id', authenticateToken, updateSchedule);
router.delete('/schedule/:id', authenticateToken, deleteSchedule);

export default router;
