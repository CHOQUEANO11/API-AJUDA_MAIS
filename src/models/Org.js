// src/models/Org.js

import mongoose from 'mongoose';

const OrgSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Org = mongoose.model('Org', OrgSchema);

// Exportando como default
export default Org;
