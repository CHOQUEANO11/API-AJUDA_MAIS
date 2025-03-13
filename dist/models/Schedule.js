"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const ScheduleSchema = new _mongoose2.default.Schema({
  user_id: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orgao_id: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Org",
    required: true,
  },
  specialty_id: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Specialty",
    required: true,
  },
  date: {
    type: String, // Armazenado no formato "YYYY-MM-DD"
    required: true,
  },
  hours: {
    type: [String], // Lista de horários, ex: ["09:00", "10:30", "14:00"]
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Schedule = _mongoose2.default.models.Schedule || _mongoose2.default.model("Schedule", ScheduleSchema);

exports. default = Schedule;
