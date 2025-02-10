// src/models/Emotion.js

import mongoose from 'mongoose';

const EmotionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  identificador: { type: String, required: true },
  created_at: {type: Date, required: true}
});

const Emotion = mongoose.model('Emotion', EmotionSchema);

// Exportando como default
export default Emotion;
