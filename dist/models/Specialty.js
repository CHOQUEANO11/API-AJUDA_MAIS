"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/models/Specialty.js

var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

// Definir o esquema
const SpecialtySchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
  orgao_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Org', required: true },
});

// Criar o modelo
const Specialty = _mongoose2.default.model('Specialty', SpecialtySchema);

// Exportação padrão
exports. default = Specialty;
