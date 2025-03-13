"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _SessionChatEvaluationjs = require('../models/SessionChatEvaluation.js'); var _SessionChatEvaluationjs2 = _interopRequireDefault(_SessionChatEvaluationjs);

/**
 * Lista todas as sessões de chat
 */
 const listAllSessions = async (req, res) => {
  try {
    const sessions = await _SessionChatEvaluationjs2.default.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Sessões encontradas!", data: sessions });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar sessões.", error: error.message });
  }
}; exports.listAllSessions = listAllSessions;

/**
 * Obtém uma sessão específica por ID
 */
 const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await _SessionChatEvaluationjs2.default.findOne({ sessionId: id });

    if (!session) {
      return res.status(404).json({ message: "Sessão não encontrada." });
    }

    res.status(200).json({ message: "Sessão encontrada!", data: session });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar sessão.", error: error.message });
  }
}; exports.getSessionById = getSessionById;

/**
 * Cria uma nova sessão de chat
 */
 const createSession = async (req, res) => {
  try {
    const sessionData = {
      sessionId: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...req.body,
    };

    const newSession = await _SessionChatEvaluationjs2.default.create(sessionData);
    res.status(201).json({ message: "Sessão criada com sucesso!", data: newSession });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar sessão.", error: error.message });
  }
}; exports.createSession = createSession;

/**
 * Atualiza uma sessão de chat
 */
 const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;

    const updatedSession = await _SessionChatEvaluationjs2.default.findOneAndUpdate(
      { sessionId: id },
      { $set: { messages } },
      { new: true }
    );

    if (!updatedSession) {
      return res.status(404).json({ message: "Sessão não encontrada." });
    }

    res.status(200).json({ message: "Sessão atualizada com sucesso!", data: updatedSession });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar sessão.", error: error.message });
  }
}; exports.updateSession = updateSession;

/**
 * Finaliza uma sessão de chat
 */
 const finalizeSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await _SessionChatEvaluationjs2.default.findOne({ sessionId: id });

    if (!session) {
      return res.status(404).json({ message: "Sessão não encontrada." });
    }

    const lastMessage = session.messages.length > 0 ? session.messages[session.messages.length - 1].text : "";

    const updatedSession = await _SessionChatEvaluationjs2.default.findOneAndUpdate(
      { sessionId: id },
      {
        status: "completed",
        diagnosis: {
          ...req.body.diagnosis,
          summary: lastMessage,
        },
        endedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({ message: "Sessão finalizada com sucesso!", data: updatedSession });
  } catch (error) {
    res.status(500).json({ message: "Erro ao finalizar sessão.", error: error.message });
  }
}; exports.finalizeSession = finalizeSession;

/**
 * Deleta uma sessão de chat
 */
 const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSession = await _SessionChatEvaluationjs2.default.findOneAndDelete({ sessionId: id });

    if (!deletedSession) {
      return res.status(404).json({ message: "Sessão não encontrada." });
    }

    res.status(200).json({ message: "Sessão excluída com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir sessão.", error: error.message });
  }
}; exports.deleteSession = deleteSession;
