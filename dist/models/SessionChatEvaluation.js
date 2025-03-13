"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const SessionSchema = new _mongoose2.default.Schema({
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
  diagnosis: _mongoose2.default.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: Date,
});

// export default mongoose.model(
//   'SessionChatEvaluation',
//   SessionChatEvaluationSchema
// );

const SessionChatEvaluation = _mongoose2.default.models.SessionChatEvaluation || _mongoose2.default.model("SessionChatEvaluation", SessionSchema);

exports. default = SessionChatEvaluation;
