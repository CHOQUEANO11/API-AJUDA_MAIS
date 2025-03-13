"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/controllers/userController.js

var _UserSpecialtyjs = require('../models/UserSpecialty.js'); var _UserSpecialtyjs2 = _interopRequireDefault(_UserSpecialtyjs);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _mailjs = require('../config/mail.js'); var _mailjs2 = _interopRequireDefault(_mailjs);

 const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, orgao_id, specialty_id } = req.body;

    // Hash da senha
    const hashedPassword = await _bcrypt2.default.hash(password, 10);

    // Criação do usuário
    const user = new (0, _UserSpecialtyjs2.default)({
      name,
      email,
      password: hashedPassword,
      phone,
      orgao_id,
      specialty_id,
      photo: req.file ? req.file.path : undefined,
    });

    // Salvar o usuário no banco
    await user.save();

    // Enviar e-mail de boas-vindas
    await _mailjs2.default.sendMail({
      from: process.env.EMAIL_USER, // O e-mail do remetente deve estar configurado no .env
      to: email,
      subject: 'Bem-vindo!',
      text: `Olá ${name}, bem-vindo ao nosso sistema!`,
    });

    // Resposta de sucesso
    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
}; exports.createUser = createUser;
