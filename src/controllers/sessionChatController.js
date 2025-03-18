import SessionChatEvaluation from '../models/SessionChatEvaluation.js';
// import mongoose from "mongoose";


/**
 * Lista todas as sessões de chat
 */
export const listAllSessions = async (req, res) => {
  try {
    const sessions = await SessionChatEvaluation.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Sessões encontradas!", data: sessions });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar sessões.", error: error.message });
  }
};

/**
 * Obtém uma sessão específica por ID
 */
export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SessionChatEvaluation.findOne({ sessionId: id });

    if (!session) {
      return res.status(404).json({ message: "Sessão não encontrada." });
    }

    res.status(200).json({ message: "Sessão encontrada!", data: session });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar sessão.", error: error.message });
  }
};

/**
 * Cria uma nova sessão de chat
 */
export const createSession = async (req, res) => {
  try {
    console.log("Recebendo requisição para criar sessão:", req.body);

    const sessionData = {
      sessionId: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...req.body,
    };

    console.log("Dados da sessão a serem salvos:", sessionData);

    const newSession = await SessionChatEvaluation.create(sessionData);

    console.log("Sessão criada com sucesso:", newSession);
    res.status(201).json({ message: "Sessão criada com sucesso!", data: newSession });
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    res.status(500).json({ message: "Erro ao criar sessão.", error: error.message });
  }
};


/**
 * Atualiza uma sessão de chat
 */
export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;

    const updatedSession = await SessionChatEvaluation.findOneAndUpdate(
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
};

/**
 * Finaliza uma sessão de chat
 */
export const finalizeSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SessionChatEvaluation.findOne({ sessionId: id });

    if (!session) {
      return res.status(404).json({ message: "Sessão não encontrada." });
    }

    const lastMessage = session.messages.length > 0 ? session.messages[session.messages.length - 1].text : "";

    const updatedSession = await SessionChatEvaluation.findOneAndUpdate(
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
};

/**
 * Deleta uma sessão de chat
 */
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSession = await SessionChatEvaluation.findOneAndDelete({ sessionId: id });

    if (!deletedSession) {
      return res.status(404).json({ message: "Sessão não encontrada." });
    }

    res.status(200).json({ message: "Sessão excluída com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir sessão.", error: error.message });
  }
};
