// src/controllers/userController.js

import SpecialtyUser from '../models/UserSpecialty.js';
import bcrypt from 'bcrypt';
import transporter from '../config/mail.js';
import nodemailer from 'nodemailer';
import path from "path";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export const createSpecialtyUser = async (req, res) => {
  try {
    const { name, email, password, phone, orgao_id, specialty_id } = req.body;

    // Verificar se o e-mail já existe
    const emailExists = await SpecialtyUser.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'E-mail já está em uso!' });
    }

    // HASH USUÁRIO
    const hashedPassword = await bcrypt.hash(password, 10);

    const photo = req.file ? req.file.path : null;

    // Criando o usuário
    const user = new SpecialtyUser({
      name,
      email,
      password: hashedPassword,
      phone,
      orgao_id,
      specialty_id,
      photo
    });

    // Salvando o usuário no banco
    await user.save();

    
    const date = format(new Date(), "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
      locale: ptBR,
    });


    const transporter = nodemailer.createTransport({
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
          path: path.resolve('./uploads/1737770287479-logo2.png'),
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
};

export const getSpecialtyUser = async (req, res) => {
  try {
    const { id } = req.params; // Pegando o ID da URL
    const user = await SpecialtyUser.findById(id); // Buscando o usuário pelo ID

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
};

// Método para buscar todos os usuários
export const getSpecialtyUsers = async (req, res) => {
  try {
    const users = await SpecialtyUser.find().populate('orgao_id', 'name').populate('specialty_id', 'name');; // Buscando todos os usuários
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

export const updateSpecialtyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, orgao_id, specialty_id } = req.body;

    // Verificar se o e-mail já está em uso por outro usuário
    const emailExists = await SpecialtyUser.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      return res.status(400).json({ message: 'E-mail já está em uso!' });
    }

    const user = await User.findById(id);
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
      user.password = await bcrypt.hash(password, 10); // Re-hash da senha se atualizada
    }

    if (req.file) {
      user.photo = req.file.path; // Atualizar foto se enviada
    }

    await user.save();

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};

// Deletar usuário
export const deleteSpecialtyUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await SpecialtyUser.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
};
