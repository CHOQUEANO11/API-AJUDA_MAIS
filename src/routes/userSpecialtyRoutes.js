import express from 'express';
import { createSpecialtyUser, getSpecialtyUser, getSpecialtyUsers, updateSpecialtyUser,  deleteSpecialtyUser, getSpecialtyUsersByOrgao } from '../controllers/userSpecialtyController.js';
import upload from '../config/multerConfig.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();


// Rota para criar usuários especialistas com upload de foto
router.post('/specialtyUser', upload.single('photo'), createSpecialtyUser);
router.get('/specialtyUsers', authenticateToken, getSpecialtyUsers);
router.get('/specialtyUser/:id', authenticateToken, getSpecialtyUser);
router.get('/specialtyOrg/:orgao_id', authenticateToken, getSpecialtyUsersByOrgao);
router.put('/update/:id', authenticateToken, updateSpecialtyUser);
router.delete('/delete/:id', authenticateToken, deleteSpecialtyUser);


export default router;
