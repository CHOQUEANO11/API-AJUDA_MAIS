"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose); 

const connectDB = async () => {
  try {
    await _mongoose2.default.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1); 
  }
};

exports. default = connectDB; 

// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }