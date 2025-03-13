"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/controllers/userController.js

var _UserSpecialtyjs = require('../models/UserSpecialty.js'); var _UserSpecialtyjs2 = _interopRequireDefault(_UserSpecialtyjs);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _mailjs = require('../config/mail.js'); var _mailjs2 = _interopRequireDefault(_mailjs);
var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _datefns = require('date-fns');
var _locale = require('date-fns/locale');
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);


 const createSpecialtyUser = async (req, res) => {
  try {
    const { name, email, password, phone, orgao_id, specialty_id } = req.body;

    // Verificar se o e-mail já existe
    const emailExists = await _UserSpecialtyjs2.default.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'E-mail já está em uso!' });
    }

    // HASH USUÁRIO
    const hashedPassword = await _bcrypt2.default.hash(password, 10);

    const photo = req.file ? req.file.path : null;

    // Criando o usuário
    const user = new (0, _UserSpecialtyjs2.default)({
      name,
      email,
      password: hashedPassword,
      phone,
      orgao_id,
      specialty_id,
      photo: `http://localhost:3001/${photo}`
    });

    // Salvando o usuário no banco
    await user.save();

    
    const date = _datefns.format.call(void 0, new Date(), "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
      locale: _locale.ptBR,
    });


    const transporter = _nodemailer2.default.createTransport({
      service: 'yahoo',
      auth: {
        user: 'nilsonsilva21@yahoo.com.br',
        pass: 'ggmoohocgatpagni',
      },
    });

    const mailOptions = {
      from: "nilsonsilva21@yahoo.com.br",
      to: `${email}`,
      subject: 'Seja bem vindo ao APP AJUDA+',
      html: `
        <p>Olá ${user.name},</p>
        <p>Aqui estão suas credenciais de acesso, envidadas no ${date}:</p>

        <p>Usuário: ${user.email}</p>
        <p>SENHA: ${password}</p>
        <br>
        <p>Atenciosamente,</p>
        <p>Equipe AJUDA+</p>
        <br>
        <style>
          .image-container {
            text-align: center;
            margin-top: 50px;
          }
          .image-container img {
            width: 30px;
            height: 30px;
          }
        </style>
        <div class="image-container">
        <img src="cid:footerImage" alt="Footer Image" />
        </div>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: _path2.default.resolve('./uploads/1737770287479-logo2.png'),
          cid: 'footerImage' // same cid value as in the html img src
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.send('Email sent: ' + info.response);
    });

    // Respondendo com sucesso
    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
}; exports.createSpecialtyUser = createSpecialtyUser;

 const getSpecialtyUser = async (req, res) => {
  try {
    const { id } = req.params; // Pegando o ID da URL
    const user = await _UserSpecialtyjs2.default.findById(id); // Buscando o usuário pelo ID

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
}; exports.getSpecialtyUser = getSpecialtyUser;

 const getSpecialtyUsersByOrgao = async (req, res) => {
  try {
    const { orgao_id } = req.params;

    if (!_mongoose2.default.Types.ObjectId.isValid(orgao_id)) {
      return res.status(400).json({ message: "ID do órgão inválido" });
    }

    const users = await _UserSpecialtyjs2.default.find({ orgao_id: new _mongoose2.default.Types.ObjectId(orgao_id) }).populate("specialty_id", "name").populate("orgao_id", "name");

    if (!users.length) {
      return res.status(404).json({ message: "Nenhum usuário encontrado para este órgão!" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
}; exports.getSpecialtyUsersByOrgao = getSpecialtyUsersByOrgao;


// Método para buscar todos os usuários
 const getSpecialtyUsers = async (req, res) => {
  try {
    const users = await _UserSpecialtyjs2.default.find().populate('orgao_id', 'name').populate('specialty_id', 'name');; // Buscando todos os usuários
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
}; exports.getSpecialtyUsers = getSpecialtyUsers;

// export const getUser = async (req, res) => {
//   const id = req.user.id;

//   // Exemplo: Buscar o usuário no banco de dados usando o ID
//   SpecialtyUser.findById(id)
//     .then(user => {
//       if (!user) return res.status(404).json({ error: 'User not found' });
//       res.json(user); // Retorna os dados do usuário
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'Server error' });
//     });
// }

 const updateSpecialtyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, orgao_id, specialty_id } = req.body;

    // Verificar se o e-mail já está em uso por outro usuário
    const emailExists = await _UserSpecialtyjs2.default.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      return res.status(400).json({ message: 'E-mail já está em uso!' });
    }

    const user = await _UserSpecialtyjs2.default.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Atualizar os campos
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.orgao_id = orgao_id || user.orgao_id;
    user.specialty_id = specialty_id || user.specialty_id;

    if (password) {
      user.password = await _bcrypt2.default.hash(password, 10); // Re-hash da senha se atualizada
    }

    if (req.file) {
      user.photo = req.file.path; // Atualizar foto se enviada
    }

    await user.save();

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
}; exports.updateSpecialtyUser = updateSpecialtyUser;

// Deletar usuário
 const deleteSpecialtyUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await _UserSpecialtyjs2.default.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
}; exports.deleteSpecialtyUser = deleteSpecialtyUser;
