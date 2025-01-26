// src/controllers/specialtyController.js

import Specialty from '../models/Specialty.js';

export const createSpecialty = async (req, res) => {
  try {
    const { name, orgao_id } = req.body;
    const specialty = new Specialty({ name, orgao_id });
    await specialty.save();
    res.status(201).json({ message: 'Especialidade criada com sucesso!', specialty });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a especialidade', error });
  }
};

export const getSpecialty = async (req, res) => {
  try {
    const specialty = await Specialty.find().populate('orgao_id', 'name'); // Busca todos os órgãos no banco de dados
    res.status(200).json(specialty); // Retorna os órgãos encontrados
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar especialidade', error });
  }
};

export const getSpecialtiesByOrgao = async (req, res) => {
  try {
    const { orgao_id } = req.params; // Pegando o ID do órgão da URL

    // Buscando todas as especialidades relacionadas ao órgão
    const specialties = await Specialty.find({ orgao_id }).populate('orgao_id', 'name');

    if (specialties.length === 0) {
      return res.status(404).json({ message: 'Nenhuma especialidade encontrada para este órgão!' });
    }

    res.status(200).json({ specialties });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar especialidades', error });
  }
};

export const updateSpecialty = async (req, res) => {
  try {
    const { id } = req.params; // ID da especialidade que será atualizada
    const updates = req.body; // Dados para atualizar

    // Buscando e atualizando a especialidade
    const updatedSpecialty = await Specialty.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedSpecialty) {
      return res.status(404).json({ message: 'Especialidade não encontrada!' });
    }

    res.status(200).json({ message: 'Especialidade atualizada com sucesso!', updatedSpecialty });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar especialidade', error });
  }
};

export const deleteSpecialty = async (req, res) => {
  try {
    const { id } = req.params; // ID da especialidade a ser deletada

    // Buscando e deletando a especialidade
    const deletedSpecialty = await Specialty.findByIdAndDelete(id);

    if (!deletedSpecialty) {
      return res.status(404).json({ message: 'Especialidade não encontrada!' });
    }

    res.status(200).json({ message: 'Especialidade deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar especialidade', error });
  }
};


