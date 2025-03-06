import express from 'express';
import { createAppointment, getAppointments, deleteAppointment, getAppointmentsByUser, updateAppointmentStatus, getAppointmentsByUserId } from '../controllers/appointmentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/appoint', authenticateToken, createAppointment);
router.get('/appointments', authenticateToken, getAppointments);
router.put('/appointments/:id/status', updateAppointmentStatus);

router.get('/appointments/user/:user_id', authenticateToken, getAppointmentsByUserId);
router.get('/appointments/specialist/:specialist_id', authenticateToken, getAppointmentsByUser);
// router.put('/appointments/:id', authenticateToken, updateAppointment);
router.delete('/appointments/:id', authenticateToken, deleteAppointment);

export default router;