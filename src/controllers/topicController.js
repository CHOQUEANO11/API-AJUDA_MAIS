import Topic from "../models/Topic.js";
import mongoose from "mongoose";

/**
 * Cria um novo tópico
 */
export const createTopic = async (req, res) => {
  try {
    const { user_id, orgao_id, text } = req.body;

    if (!user_id || !orgao_id || !text) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const newTopic = new Topic({ user_id, orgao_id, text, date: new Date() });
    await newTopic.save();

    res.status(201).json({ message: "Tópico criado com sucesso!", data: newTopic });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o tópico.", error: error.message });
  }
};

/**
 * Obtém todos os tópicos
 */
export const getTopics = async (req, res) => {
  try {
    const { orgao_id } = req.params; // Obtém o orgao_id do usuário autenticado

    if (!orgao_id) {
      return res.status(400).json({ message: "Órgão não especificado." });
    }

    const topics = await Topic.find({ orgao_id })
      .populate("user_id", "name") // Popula o nome do criador do tópico
      .populate({
        path: "comments",
        populate: {
          path: "user_id",
          select: "name",
        },
      })
      .sort({ date: -1 });

    if (!topics.length) {
      return res.status(404).json({ message: "Nenhum tópico encontrado para este órgão." });
    }

    res.status(200).json({ message: "Tópicos encontrados!", data: topics });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tópicos.", error: error.message });
  }
};



/**
 * Obtém um tópico pelo ID
 */
export const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const topic = await Topic.findById(id).populate("user_id", "name");

    if (!topic) {
      return res.status(404).json({ message: "Tópico não encontrado." });
    }

    res.status(200).json({ message: "Tópico encontrado!", data: topic });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar o tópico.", error: error.message });
  }
};

/**
 * Adiciona um comentário a um tópico
 */
export const addCommentToTopic = async (req, res) => {
  try {
    const { topic_id } = req.params;
    const { user_id, orgao_id, comment } = req.body;

    if (!user_id || !orgao_id || !comment) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const topic = await Topic.findById(topic_id);
    if (!topic) {
      return res.status(404).json({ message: "Tópico não encontrado." });
    }

    topic.comments.push({ user_id, orgao_id, comment, date: new Date() });
    await topic.save();

    res.status(201).json({ message: "Comentário adicionado com sucesso!", data: topic });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar comentário.", error: error.message });
  }
};

/**
 * Deleta um tópico pelo ID
 */
export const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const deletedTopic = await Topic.findByIdAndDelete(id);
    if (!deletedTopic) {
      return res.status(404).json({ message: "Tópico não encontrado." });
    }

    res.status(200).json({ message: "Tópico excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir o tópico.", error: error.message });
  }
};