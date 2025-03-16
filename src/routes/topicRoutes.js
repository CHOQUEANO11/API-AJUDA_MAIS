import express from 'express';
import {
  createTopic,
  getTopics,
  getTopicById,
  addCommentToTopic,
  deleteTopic
} from '../controllers/topicController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas para tópicos
router.post('/topics', authenticateToken, createTopic); // Criar um novo tópico
router.get('/topics/:orgao_id', authenticateToken, getTopics); // Buscar todos os tópicos
router.get('/topics/:id', authenticateToken, getTopicById); // Buscar um tópico por ID
router.post('/topics/:topic_id/comments', authenticateToken, addCommentToTopic); // Adicionar um comentário a um tópico
router.delete('/topics/:id', authenticateToken, deleteTopic); // Excluir um tópico

export default router;
