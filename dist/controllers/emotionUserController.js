"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _EmotionUserjs = require('../models/EmotionUser.js'); var _EmotionUserjs2 = _interopRequireDefault(_EmotionUserjs);

 const createEmotionUser = async (req, res) => {
  try {
    const { user_id, identificador, description, name, created_at } = req.body;
    const emotionUser = new (0, _EmotionUserjs2.default)({ user_id, identificador, description, name, created_at });
    await emotionUser.save();
    res.status(201).json({ message: 'Emoção do usuário criada com sucesso!', emotionUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar emoção do usuário', error });
  }
}; exports.createEmotionUser = createEmotionUser;

 const getEmotionsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const emotions = await _EmotionUserjs2.default.find({ user_id }).populate('user_id', 'name');
    res.status(200).json(emotions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar emoções do usuário', error });
  }
}; exports.getEmotionsByUser = getEmotionsByUser;


 const updateEmotionUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedEmotionUser = await _EmotionUserjs2.default.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedEmotionUser) {
      return res.status(404).json({ message: 'Emoção do usuário não encontrada!' });
    }
    res.status(200).json({ message: 'Emoção do usuário atualizada com sucesso!', updatedEmotionUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar emoção do usuário', error });
  }
}; exports.updateEmotionUser = updateEmotionUser;

 const deleteEmotionUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmotionUser = await _EmotionUserjs2.default.findByIdAndDelete(id);
    if (!deletedEmotionUser) {
      return res.status(404).json({ message: 'Emoção do usuário não encontrada!' });
    }
    res.status(200).json({ message: 'Emoção do usuário deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar emoção do usuário', error });
  }
}; exports.deleteEmotionUser = deleteEmotionUser;

// Criação de somente um diario de emoções por dia.

// export const createEmotionUser = async (req, res) => {
//   try {
//     const { user_id, identificador, name, created_at } = req.body;

//     // Definir o início e o fim do dia atual para a verificação
//     const startOfDay = new Date();
//     startOfDay.setHours(0, 0, 0, 0);

//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);

//     // Verificar se o usuário já criou uma emoção hoje
//     const existingEmotion = await EmotionUser.findOne({
//       user_id: new mongoose.Types.ObjectId(user_id),
//       created_at: { $gte: startOfDay, $lte: endOfDay }
//     });

//     if (existingEmotion) {
//       return res.status(400).json({ message: 'Você já registrou uma emoção hoje!' });
//     }

//     // Criar nova emoção
//     const emotionUser = new EmotionUser({ user_id, identificador, name, created_at });
//     await emotionUser.save();
    
//     res.status(201).json({ message: 'Emoção do usuário criada com sucesso!', emotionUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao criar emoção do usuário', error });
//   }
// };
