import Emotion from '../models/Emotion.js';

export const createEmotion = async (req, res) => {
  try {
    const { name, identificador } = req.body;
    const emotion = new Emotion({ name, identificador, created_at: new Date() });
    await emotion.save();
    res.status(201).json({ message: 'Emoção criada com sucesso!', emotion });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar emoção', error });
  }
};


export const getEmotions = async (req, res) => {
  try {
    const emotions = await Emotion.find();
    res.status(200).json(emotions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar emoções', error });
  }
};

export const updateEmotion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedEmotion = await Emotion.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedEmotion) {
      return res.status(404).json({ message: 'Emoção não encontrada!' });
    }
    res.status(200).json({ message: 'Emoção atualizada com sucesso!', updatedEmotion });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar emoção', error });
  }
};

export const deleteEmotion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmotion = await Emotion.findByIdAndDelete(id);
    if (!deletedEmotion) {
      return res.status(404).json({ message: 'Emoção não encontrada!' });
    }
    res.status(200).json({ message: 'Emoção deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar emoção', error });
  }
};
