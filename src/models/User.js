import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: String, required: false },
  orgao_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Org', required: true },
  specialty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: false },
  photo: { type: String },
  role: {
    type: String,
    enum: ['user', 'admin', 'master'],
    default: 'user',
  },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;

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
