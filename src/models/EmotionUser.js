import mongoose from 'mongoose';

const EmotionUserSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  identificador: { type: String, required: true },
  name: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now }
});


const EmotionUser = mongoose.model('EmotionUser', EmotionUserSchema);

export default EmotionUser;
