"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const UserSchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: String, required: false },
  orgao_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Org', required: true },
  specialty_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Specialty', required: false },
  photo: { type: String },
  role: {
    type: String,
    enum: ['user', 'admin', 'master'],
    default: 'user',
  },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  emotion: { type: String, enum: ['visible', 'invisible'], default: 'visible' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = _mongoose2.default.model('User', UserSchema);

exports. default = User;

// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
//   age: { type: String, required: true },
//   orgao_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Org', required: true },
//   photo: { type: String },
// });

// const User = mongoose.model('User', UserSchema);

// export default User; // Exportação padrão
