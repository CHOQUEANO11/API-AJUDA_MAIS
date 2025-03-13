"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const medicalRecordSchema = new _mongoose2.default.Schema({
  user_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User', required: true }, // Paciente
  specialist_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User', required: true }, // Especialista
  appointment_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Appointment', required: true }, // Consulta vinculada
  date: { type: Date, required: true }, // Data do atendimento
  notes: { type: String, required: true }, // Relato da evolução do paciente
  createdAt: { type: Date, default: Date.now },
});

const MedicalRecord = _mongoose2.default.model('MedicalRecord', medicalRecordSchema);
exports. default = MedicalRecord;
