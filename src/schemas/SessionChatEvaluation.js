import mongoose from 'mongoose';

const SessionChatEvaluationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: { type: Array, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model(
  'SessionChatEvaluation',
  SessionChatEvaluationSchema
);
