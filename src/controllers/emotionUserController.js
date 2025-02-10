import EmotionUser from '../models/EmotionUser.js';

export const createEmotionUser = async (req, res) => {
  try {
    const { user_id, identificador, name, created_at } = req.body;
    const emotionUser = new EmotionUser({ user_id, identificador, name, created_at });
    await emotionUser.save();
    res.status(201).json({ message: 'Emoção do usuário criada com sucesso!', emotionUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar emoção do usuário', error });
  }
};

export const getEmotionsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const emotions = await EmotionUser.find({ user_id }).populate('user_id', 'name');
    res.status(200).json(emotions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar emoções do usuário', error });
  }
};


export const updateEmotionUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedEmotionUser = await EmotionUser.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedEmotionUser) {
      return res.status(404).json({ message: 'Emoção do usuário não encontrada!' });
    }
    res.status(200).json({ message: 'Emoção do usuário atualizada com sucesso!', updatedEmotionUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar emoção do usuário', error });
  }
};

export const deleteEmotionUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmotionUser = await EmotionUser.findByIdAndDelete(id);
    if (!deletedEmotionUser) {
      return res.status(404).json({ message: 'Emoção do usuário não encontrada!' });
    }
    res.status(200).json({ message: 'Emoção do usuário deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar emoção do usuário', error });
  }
};

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
