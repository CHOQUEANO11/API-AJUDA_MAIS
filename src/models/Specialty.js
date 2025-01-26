// src/models/Specialty.js

import mongoose from 'mongoose';

// Definir o esquema
const SpecialtySchema = new mongoose.Schema({
  name: { type: String, required: true },
  orgao_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Org', required: true },
});

// Criar o modelo
const Specialty = mongoose.model('Specialty', SpecialtySchema);

// Exportação padrão
export default Specialty;
