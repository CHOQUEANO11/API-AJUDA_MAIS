"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _MedicalRecordjs = require('../models/MedicalRecord.js'); var _MedicalRecordjs2 = _interopRequireDefault(_MedicalRecordjs);
var _Appointmentjs = require('../models/Appointment.js'); var _Appointmentjs2 = _interopRequireDefault(_Appointmentjs);
var _serverjs = require('../server.js');

/**
 * Cria um novo prontuário vinculado a uma consulta existente.
 */
 const createMedicalRecord = async (req, res) => {
  try {
    const { user_id, specialist_id, appointment_id, date, notes } = req.body;

    // Verifica se a consulta existe
    const appointment = await _Appointmentjs2.default.findById(appointment_id);
    if (!appointment) {
      return res.status(404).json({ message: 'Consulta não encontrada!' });
    }

    // Cria o prontuário
    const medicalRecord = new (0, _MedicalRecordjs2.default)({ user_id, specialist_id, appointment_id, date, notes });
    await medicalRecord.save();

    _serverjs.io.emit('appointmentUpdated', { message: 'Novo Prontuário criado com sucesso!', medicalRecord });

    res.status(201).json({ message: 'Prontuário criado com sucesso!', medicalRecord });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar prontuário', error });
  }
}; exports.createMedicalRecord = createMedicalRecord;

/**
 * Lista todos os prontuários cadastrados.
 */
 const getMedicalRecords = async (req, res) => {
  try {
    const records = await _MedicalRecordjs2.default.find()
    .populate('user_id', 'name email phone') // Paciente
    .populate({
      path: 'specialist_id',
      select: 'name email phone specialty_id', // Especialista + Especialidade
      populate: { path: 'specialty_id', select: 'name' } // Nome da especialidade
    })
    .populate('appointment_id', 'date hour'); // Consulta

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar prontuários', error });
  }
}; exports.getMedicalRecords = getMedicalRecords;

/**
 * Lista os prontuários de um paciente específico.
 */
 const getMedicalRecordsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const records = await _MedicalRecordjs2.default.find({ user_id })
    .populate({
      path: 'specialist_id',
      select: 'name email phone specialty_id',
      populate: { path: 'specialty_id', select: 'name' }

    })
    .populate('appointment_id', 'date hour')
    .populate('user_id', 'name email')

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar prontuários do paciente', error });
  }
}; exports.getMedicalRecordsByUser = getMedicalRecordsByUser;

/**
 * Lista os prontuários feitos por um especialista específico.
 */
 const getMedicalRecordsBySpecialist = async (req, res) => {
  try {
    const { specialist_id } = req.params;

    const records = await _MedicalRecordjs2.default.find({ specialist_id })
      .populate('user_id', 'name email phone')
      .populate('appointment_id', 'date hour');

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar prontuários do especialista', error });
  }
}; exports.getMedicalRecordsBySpecialist = getMedicalRecordsBySpecialist;

/**
 * Exclui um prontuário pelo ID.
 */
 const deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await _MedicalRecordjs2.default.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).json({ message: 'Prontuário não encontrado!' });
    }

    res.status(200).json({ message: 'Prontuário excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir prontuário', error });
  }
}; exports.deleteMedicalRecord = deleteMedicalRecord;
