import SessionChatEvaluation from '../shemas/SessionChatEvaluation';

class SessionChatEvaluationController {
  async listAll(req, res) {
    try {
      const sessions = await SessionChatEvaluation.find().sort({
        createdAt: -1,
      });
      return res.json(sessions);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao buscar sessões',
        details: error.message,
      });
    }
  }

  // Obter uma sessão específica
  async getOne(req, res) {
    try {
      const session = await SessionChatEvaluation.findOne({
        sessionId: req.params.id,
      });

      if (!session) {
        return res.status(404).json({ error: 'Sessão não encontrada' });
      }

      return res.json(session);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao buscar sessão',
        details: error.message,
      });
    }
  }

  // Criar nova sessão
  async create(req, res) {
    try {
      const sessionData = {
        sessionId: `chat_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        ...req.body,
      };

      const session = await SessionChatEvaluation.create(sessionData);
      return res.status(201).json(session);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao criar sessão',
        details: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const session = await SessionChatEvaluation.findOneAndUpdate(
        { sessionId: req.params.id }, // Busca por sessionId
        { $set: { messages: req.body.messages } },
        { new: true }
      );

      if (!session) {
        return res.status(404).json({ error: 'Sessão não encontrada' });
      }

      return res.json(session);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao atualizar sessão',
        details: error.message,
      });
    }
  }

  async finalize(req, res) {
    try {
      // Buscar a sessão existente
      const session = await SessionChatEvaluation.findOne({
        sessionId: req.params.id,
      });

      if (!session) {
        return res.status(404).json({ error: 'Sessão não encontrada' });
      }

      // Pegar a última mensagem
      const lastMessage =
        session.messages.length > 0
          ? session.messages[session.messages.length - 1].text
          : '';

      // Atualizar o diagnóstico com o resumo
      const updatedSession = await SessionChatEvaluation.findOneAndUpdate(
        { sessionId: req.params.id },
        {
          status: 'completed',
          diagnosis: {
            ...req.body.diagnosis,
            summary: lastMessage,
          },
          endedAt: new Date(),
        },
        { new: true }
      );

      return res.json(updatedSession);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao finalizar sessão',
        details: error.message,
      });
    }
  }
}

export default new SessionChatEvaluationController();
