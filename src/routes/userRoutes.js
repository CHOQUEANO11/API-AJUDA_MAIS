import express from 'express';
import { createUser, getUser, getUsers, updateUser, deleteUser , getSpecialtyUsersByOrgao } from '../controllers/userController.js';
import upload from '../config/multerConfig.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/', upload.single('photo'), createUser);
// router.get('/user', authenticateToken, getUser);
router.get('/getUser', authenticateToken, getUser);
router.get('/getUser/:orgao_id', authenticateToken, getSpecialtyUsersByOrgao);
router.get('/users', authenticateToken, getUsers);
router.put('/user/:id', authenticateToken, updateUser);
router.delete('/user/:id', authenticateToken, deleteUser);

export default router;
