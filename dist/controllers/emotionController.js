"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Emotionjs = require('../models/Emotion.js'); var _Emotionjs2 = _interopRequireDefault(_Emotionjs);

 const createEmotion = async (req, res) => {
  try {
    const { name, identificador } = req.body;
    const emotion = new (0, _Emotionjs2.default)({ name, identificador, created_at: new Date() });
    await emotion.save();
    res.status(201).json({ message: 'Emoção criada com sucesso!', emotion });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar emoção', error });
  }
}; exports.createEmotion = createEmotion;


 const getEmotions = async (req, res) => {
  try {
    const emotions = await _Emotionjs2.default.find();
    res.status(200).json(emotions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar emoções', error });
  }
}; exports.getEmotions = getEmotions;

 const updateEmotion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedEmotion = await _Emotionjs2.default.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedEmotion) {
      return res.status(404).json({ message: 'Emoção não encontrada!' });
    }
    res.status(200).json({ message: 'Emoção atualizada com sucesso!', updatedEmotion });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar emoção', error });
  }
}; exports.updateEmotion = updateEmotion;

 const deleteEmotion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmotion = await _Emotionjs2.default.findByIdAndDelete(id);
    if (!deletedEmotion) {
      return res.status(404).json({ message: 'Emoção não encontrada!' });
    }
    res.status(200).json({ message: 'Emoção deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar emoção', error });
  }
}; exports.deleteEmotion = deleteEmotion;
