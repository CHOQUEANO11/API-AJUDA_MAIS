// src/models/Org.js

import mongoose from 'mongoose';

const PerfilSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Perfil = mongoose.model('Perfil', PerfilSchema);

// Exportando como default
export default Perfil;
