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
      const session = await SessionChatEvaluation.findOneAndUpdate(
        { sessionId: req.params.id },
        {
          $set: {
            status: 'completed',
            diagnosis: req.body.diagnosis,
            endedAt: new Date(),
          },
        },
        { new: true }
      );

      if (!session) {
        return res.status(404).json({ error: 'Sessão não encontrada' });
      }

      return res.json(session);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao finalizar sessão',
        details: error.message,
      });
    }
  }
}

export default new SessionChatEvaluationController();
