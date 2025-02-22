import express from 'express';
import { createAppointment, getAppointments, deleteAppointment, getAppointmentsByUser, updateAppointmentStatus } from '../controllers/appointmentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/appoint', authenticateToken, createAppointment);
router.get('/appointments', authenticateToken, getAppointments);
router.put('/appointments/:id/status', updateAppointmentStatus);

// router.get('/appointments/specialty/:specialty_id', authenticateToken, getAppointmentsBySpecialty);
router.get('/appointments/user/:specialist_id', authenticateToken, getAppointmentsByUser);
// router.put('/appointments/:id', authenticateToken, updateAppointment);
router.delete('/appointments/:id', authenticateToken, deleteAppointment);

export default router;