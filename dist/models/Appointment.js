"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const appointmentSchema = new _mongoose2.default.Schema({
  user_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User', required: true },
  specialty_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Specialty', required: true },
  specialist_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User', required: true },  // Adicionado
  orgao_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Org', required: true },
  date: { type: String, required: true },
  hour: { type: String, required: true },
  status: { type: String, enum: ["aberta", "realizada", "cancelada"], default: "aberta" },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = _mongoose2.default.model('Appointment', appointmentSchema);
exports. default = Appointment;
