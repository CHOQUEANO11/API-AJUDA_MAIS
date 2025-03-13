"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserSpecialtyjs = require('../models/UserSpecialty.js'); var _UserSpecialtyjs2 = _interopRequireDefault(_UserSpecialtyjs);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const loginSpecialty = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await _UserSpecialtyjs2.default.findOne({ email })
    .populate('orgao_id', 'name') 
    .populate('specialty_id', 'name');; 

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });

    const isPasswordValid = await _bcrypt2.default.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Credenciais inválidas!' });

    const token = _jsonwebtoken2.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login bem-sucedido!', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

exports. default = loginSpecialty;
