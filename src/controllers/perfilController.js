

import Perfil from '../models/Perfil.js';

export const createPerfil = async (req, res) => {
  try {
    const { name } = req.body;
    const perfil = new Perfil({ name });
    await perfil.save();
    res.status(201).json({ message: 'Órgão criado com sucesso!', perfil });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar órgão', error });
  }
};

export const getAllPerfil = async (req, res) => {
  try {
    const perfil = await Perfil.find(); // Busca todos os órgãos no banco de dados
    res.status(200).json(perfil); // Retorna os órgãos encontrados
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar órgãos', error });
  }
};

export const updatePerfil = async (req, res) => {
  try {
    const { id } = req.params; // ID da especialidade que será atualizada
    const updates = req.body; // Dados para atualizar

    // Buscando e atualizando a especialidade
    const updatedPerfil = await Perfil.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPerfil) {
      return res.status(404).json({ message: 'Especialidade não encontrada!' });
    }

    res.status(200).json({ message: 'Especialidade atualizada com sucesso!', updatedPerfil });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar especialidade', error });
  }
};

export const deletePerfil = async (req, res) => {
  try {
    const { id } = req.params; // ID da especialidade a ser deletada

    // Buscando e deletando a especialidade
    const deletedPerfil = await Perfil.findByIdAndDelete(id);

    if (!deletedPerfil) {
      return res.status(404).json({ message: 'Especialidade não encontrada!' });
    }

    res.status(200).json({ message: 'Especialidade deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar especialidade', error });
  }
};

