"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const EmotionUserSchema = new _mongoose2.default.Schema({
  user_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  identificador: { type: String, required: true },
  name: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now }
});


const EmotionUser = _mongoose2.default.model('EmotionUser', EmotionUserSchema);

exports. default = EmotionUser;
