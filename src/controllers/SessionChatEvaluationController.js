import SessionChatEvaluation from '../shemas/SessionChatEvaluation';

class SessionChatEvaluationController {
  async store(req, res) {
    try {
      const { userId, messages, completed } = req.body;

      const session = await SessionChatEvaluation.create({
        userId,
        messages,
        completed,
        createdAt: new Date(),
      });

      return res.status(201).json(session);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao salvar a sessão.' });
    }
  }

  async show(req, res) {
    try {
      const { userId } = req.params;
      const sessions = await SessionChatEvaluation.find({ userId }).sort({
        createdAt: -1,
      });
      return res.json(sessions);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Erro ao buscar as sessões', details: error.message });
    }
  }
}

export default new SessionChatEvaluationController();
