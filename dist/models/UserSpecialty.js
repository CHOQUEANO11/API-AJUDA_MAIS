"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/models/UserSpecialty.js

var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const UserSpecialtySchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  orgao_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: "Org" },  // user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialty_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Specialty', required: true },
  photo: { type: String },
});

// Exportando o modelo UserSpecialty com o nome 'default'
exports. default = _mongoose2.default.model('UserSpecialty', UserSpecialtySchema);
