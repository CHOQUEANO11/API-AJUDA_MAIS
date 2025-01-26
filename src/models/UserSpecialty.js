// src/models/UserSpecialty.js

import mongoose from 'mongoose';

const UserSpecialtySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  orgao_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Org', required: true },
  specialty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true },
  photo: { type: String },
});

// Exportando o modelo UserSpecialty com o nome 'default'
export default mongoose.model('UserSpecialty', UserSpecialtySchema);
