// src/controllers/userController.js

import UserSpecialty from '../models/UserSpecialty.js';
import bcrypt from 'bcrypt';
import transporter from '../config/mail.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, orgao_id, specialty_id } = req.body;

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário
    const user = new UserSpecialty({
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
    await transporter.sendMail({
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
};
