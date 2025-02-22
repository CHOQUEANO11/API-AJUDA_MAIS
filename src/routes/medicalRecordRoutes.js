import express from 'express';
import {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecordsByUser,
  getMedicalRecordsBySpecialist,
  deleteMedicalRecord
} from '../controllers/medicalRecordController.js';

const router = express.Router();

router.post('/', createMedicalRecord); // Criar prontuário
router.get('/', getMedicalRecords); // Listar todos os prontuários
router.get('/user/:user_id', getMedicalRecordsByUser); // Listar prontuários por paciente
router.get('/specialist/:specialist_id', getMedicalRecordsBySpecialist); // Listar prontuários por especialista
router.delete('/:id', deleteMedicalRecord); // Deletar um prontuário

export default router;
