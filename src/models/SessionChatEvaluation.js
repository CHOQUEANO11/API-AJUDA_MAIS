import mongoose from 'mongoose';

const SessionChatEvaluationSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  messages: [
    {
      text: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        enum: ['user', 'assistant'],
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
  diagnosis: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: Date,
});

export default mongoose.model(
  'SessionChatEvaluation',
  SessionChatEvaluationSchema
);

// const SessionChatEvaluation = mongoose.model("SessionChatEvaluation", SessionSchema);

// export default SessionChatEvaluation;
