// src/controllers/orgController.js

import Org from '../models/Org.js';

export const createOrg = async (req, res) => {
  try {
    const { name } = req.body;
    const orgao = new Org({ name });
    await orgao.save();
    res.status(201).json({ message: 'Órgão criado com sucesso!', orgao });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar órgão', error });
  }
};

export const getAllOrgs = async (req, res) => {
  try {
    const orgaos = await Org.find(); // Busca todos os órgãos no banco de dados
    res.status(200).json(orgaos); // Retorna os órgãos encontrados
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar órgãos', error });
  }
};

export const updateOrg = async (req, res) => {
  try {
    const { id } = req.params; // ID da especialidade que será atualizada
    const updates = req.body; // Dados para atualizar

    // Buscando e atualizando a especialidade
    const updatedOrg = await Org.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedOrg) {
      return res.status(404).json({ message: 'Especialidade não encontrada!' });
    }

    res.status(200).json({ message: 'Especialidade atualizada com sucesso!', updatedOrg });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar especialidade', error });
  }
};

export const deleteOrg = async (req, res) => {
  try {
    const { id } = req.params; // ID da especialidade a ser deletada

    // Buscando e deletando a especialidade
    const deletedOrg = await Org.findByIdAndDelete(id);

    if (!deletedOrg) {
      return res.status(404).json({ message: 'Especialidade não encontrada!' });
    }

    res.status(200).json({ message: 'Especialidade deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar especialidade', error });
  }
};

