"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/models/Org.js

var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const PerfilSchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
});

const Perfil = _mongoose2.default.model('Perfil', PerfilSchema);

// Exportando como default
exports. default = Perfil;
