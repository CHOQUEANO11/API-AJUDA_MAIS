import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true },
  specialist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Adicionado
  orgao_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Org', required: true },
  date: { type: String, required: true },
  hour: { type: String, required: true },
  status: { type: String, enum: ["aberta", "realizada", "cancelada"], default: "aberta" },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
