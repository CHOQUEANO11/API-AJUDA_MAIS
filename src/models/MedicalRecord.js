import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Paciente
  specialist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Especialista
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true }, // Consulta vinculada
  date: { type: Date, required: true }, // Data do atendimento
  notes: { type: String, required: true }, // Relato da evolução do paciente
  createdAt: { type: Date, default: Date.now },
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
