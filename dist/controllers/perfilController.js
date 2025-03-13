"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Perfiljs = require('../models/Perfil.js'); var _Perfiljs2 = _interopRequireDefault(_Perfiljs);

 const createPerfil = async (req, res) => {
  try {
    const { name } = req.body;
    const perfil = new (0, _Perfiljs2.default)({ name });
    await perfil.save();
    res.status(201).json({ message: 'Órgão criado com sucesso!', perfil });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar órgão', error });
  }
}; exports.createPerfil = createPerfil;

 const getAllPerfil = async (req, res) => {
  try {
    const perfil = await _Perfiljs2.default.find(); // Busca todos os órgãos no banco de dados
    res.status(200).json(perfil); // Retorna os órgãos encontrados
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar órgãos', error });
  }
}; exports.getAllPerfil = getAllPerfil;

 const updatePerfil = async (req, res) => {
  try {
    const { id } = req.params; // ID da especialidade que será atualizada
    const updates = req.body; // Dados para atualizar

    // Buscando e atualizando a especialidade
    const updatedPerfil = await _Perfiljs2.default.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPerfil) {
      return res.status(404).json({ message: 'Especialidade não encontrada!' });
    }

    res.status(200).json({ message: 'Especialidade atualizada com sucesso!', updatedPerfil });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar especialidade', error });
  }
}; exports.updatePerfil = updatePerfil;

 const deletePerfil = async (req, res) => {
  try {
    const { id } = req.params; // ID da especialidade a ser deletada

    // Buscando e deletando a especialidade
    const deletedPerfil = await _Perfiljs2.default.findByIdAndDelete(id);

    if (!deletedPerfil) {
      return res.status(404).json({ message: 'Especialidade não encontrada!' });
    }

    res.status(200).json({ message: 'Especialidade deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar especialidade', error });
  }
}; exports.deletePerfil = deletePerfil;

