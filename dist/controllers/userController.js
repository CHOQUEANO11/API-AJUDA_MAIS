"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// src/controllers/userController.js

var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _datefns = require('date-fns');
var _locale = require('date-fns/locale');
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

// Criar usuário com papéis e status
 const createUser = async (req, res) => {
  try {
    const { name, email, specialty_id, password, phone, age, orgao_id, role = 'user', status = 'active', emotion= 'invisible' } = req.body;
    const hashedPassword = await _bcrypt2.default.hash(password, 10);
    const photo = req.file ? req.file.path : null;

    const user = new (0, _Userjs2.default)({
      name, email, specialty_id, password: hashedPassword, phone, age, orgao_id, photo, role, status, emotion
    });
    await user.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
}; exports.createUser = createUser;

// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });
//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao buscar usuário', error });
//   }
// };

 const getUsers = async (req, res) => {
  try {
    const users = await _Userjs2.default.find().populate('orgao_id', 'name').populate('specialty_id', 'name');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
}; exports.getUsers = getUsers;

 const getSpecialtyUsersByOrgao = async (req, res) => {
  try {
    const { orgao_id } = req.params;

    if (!_mongoose2.default.Types.ObjectId.isValid(orgao_id)) {
      return res.status(400).json({ message: "ID do órgão inválido" });
    }

    const users = await _Userjs2.default.find({ orgao_id}).populate("orgao_id", "name").populate('specialty_id', 'name');

    if (!users.length) {
      return res.status(404).json({ message: "Nenhum usuário encontrado para este órgão!" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
}; exports.getSpecialtyUsersByOrgao = getSpecialtyUsersByOrgao;

 const getUser = async (req, res) => {
  const id = req.user.id;

  // Exemplo: Buscar o usuário no banco de dados usando o ID
  _Userjs2.default.findById(id)
    .then(user => {
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user); // Retorna os dados do usuário
    })
    .catch(err => {
      res.status(500).json({ error: 'Server error' });
    });
}; exports.getUser = getUser

 const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, orgao_id, specialty_id, emotion, age } = req.body;

    // Verificar se o e-mail já está em uso por outro usuário
    const emailExists = await _Userjs2.default.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      return res.status(400).json({ message: 'E-mail já está em uso!' });
    }

    // Buscar o usuário pelo ID
    const user = await _Userjs2.default.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Atualizar os campos usando Object.assign para eficiência
    Object.assign(user, {
      name: _nullishCoalesce(name, () => ( user.name)),
      email: _nullishCoalesce(email, () => ( user.email)),
      phone: _nullishCoalesce(phone, () => ( user.phone)),
      orgao_id: _nullishCoalesce(orgao_id, () => ( user.orgao_id)),
      specialty_id: _nullishCoalesce(specialty_id, () => ( user.specialty_id)),
      emotion: _nullishCoalesce(emotion, () => ( user.emotion)),
      age: _nullishCoalesce(age, () => ( user.age))
    });

    // Atualizar a senha se fornecida
    if (password) {
      user.password = await _bcrypt2.default.hash(password, 10);
    }

    // Atualizar a foto se enviada
    if (req.file) {
      user.photo = req.file.path;
    }

    await user.save();

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
}; exports.updateUser = updateUser;


 const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await _Userjs2.default.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
}; exports.deleteUser = deleteUser;

// // src/controllers/userController.js

// import User from '../models/User.js';
// import bcrypt from 'bcrypt';
// import nodemailer from 'nodemailer';
// import path from "path";
// import { format } from 'date-fns';
// import { ptBR } from 'date-fns/locale';


// export const createUser = async (req, res) => {
//   try {
//     const { name, email, password, phone, age, orgao_id } = req.body;

//     //HASH SENHA
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const photo = req.file ? req.file.path : null;

//     // Criando o usuário
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       age,
//       orgao_id,
//       photo
//     });

//     // Salvando o usuário no banco
//     await user.save();

//     const date = format(new Date(), "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
//       locale: ptBR,
//     });


//     const transporter = nodemailer.createTransport({
//       service: 'yahoo',
//       auth: {
//         user: 'nilsonsilva21@yahoo.com.br',
//         pass: 'ggmoohocgatpagni',
//       },
//     });

//     const mailOptions = {
//       from: "nilsonsilva21@yahoo.com.br",
//       to: `${email}`,
//       subject: 'Seja bem vindo ao APP AJUDA+',
//       html: `
//         <p>Olá ${user.name},</p>
//         <p>Aqui estão suas credenciais de acesso, envidadas no ${date}:</p>

//         <p>Usuário: ${user.email}</p>
//         <p>SENHA: ${password}</p>
//         <br>
//         <p>Atenciosamente,</p>
//         <p>Equipe AJUDA+</p>
//         <br>
//         <style>
//           .image-container {
//             text-align: center;
//             margin-top: 50px;
//           }
//           .image-container img {
//             width: 30px;
//             height: 30px;
//           }
//         </style>
//         <div class="image-container">
//         <img src="cid:footerImage" alt="Footer Image" />
//         </div>
//       `,
//       attachments: [
//         {
//           filename: 'logo.png',
//           path: path.resolve('./uploads/1737770287479-logo2.png'),
//           cid: 'footerImage' // same cid value as in the html img src
//         }
//       ]
//       // text: `Olá ${user.nome},\n\nSeus dados de acesso ao sistema Mychurch são os seguintes:\nCPF: ${user.cpf}\nSENHA: ${"123456"}\n\nAtenciocamente,\n Equipe ${nome}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).send(error.toString());
//       }
//       res.send('Email sent: ' + info.response);
//     });

//     // Respondendo com sucesso
//     res.status(201).json({ message: 'Usuário criado com sucesso!', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao criar usuário', error });
//   }
// };

// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params; // Pegando o ID da URL
//     const user = await User.findById(id); // Buscando o usuário pelo ID

//     if (!user) {
//       return res.status(404).json({ message: 'Usuário não encontrado!' });
//     }

//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao buscar usuário', error });
//   }
// };

// // Método para buscar todos os usuários
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find().populate('orgao_id', 'name');; // Buscando todos os usuários
//     res.status(200).json({ users });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao buscar usuários', error });
//   }
// };

// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, password, phone, orgao_id } = req.body;

//     // Verificar se o e-mail já está em uso por outro usuário
//     const emailExists = await User.findOne({ email, _id: { $ne: id } });
//     if (emailExists) {
//       return res.status(400).json({ message: 'E-mail já está em uso!' });
//     }

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: 'Usuário não encontrado!' });
//     }

//     // Atualizar os campos
//     user.name = name || user.name;
//     user.email = email || user.email;
//     user.phone = phone || user.phone;
//     user.orgao_id = orgao_id || user.orgao_id;

//     if (password) {
//       user.password = await bcrypt.hash(password, 10); // Re-hash da senha se atualizada
//     }

//     if (req.file) {
//       user.photo = req.file.path; // Atualizar foto se enviada
//     }

//     await user.save();

//     res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao atualizar usuário', error });
//   }
// };

// // Deletar usuário
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByIdAndDelete(id);

//     if (!user) {
//       return res.status(404).json({ message: 'Usuário não encontrado!' });
//     }

//     res.status(200).json({ message: 'Usuário deletado com sucesso!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao deletar usuário', error });
//   }
// };

