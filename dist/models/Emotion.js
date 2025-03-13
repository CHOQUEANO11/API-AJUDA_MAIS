"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/models/Emotion.js

var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const EmotionSchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
  identificador: { type: String, required: true },
  created_at: {type: Date, required: true}
});

const Emotion = _mongoose2.default.model('Emotion', EmotionSchema);

// Exportando como default
exports. default = Emotion;
