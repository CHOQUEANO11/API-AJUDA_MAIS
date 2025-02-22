import MedicalRecord from '../models/MedicalRecord.js';
import Appointment from '../models/Appointment.js';

/**
 * Cria um novo prontuário vinculado a uma consulta existente.
 */
export const createMedicalRecord = async (req, res) => {
  try {
    const { user_id, specialist_id, appointment_id, date, notes } = req.body;

    // Verifica se a consulta existe
    const appointment = await Appointment.findById(appointment_id);
    if (!appointment) {
      return res.status(404).json({ message: 'Consulta não encontrada!' });
    }

    // Cria o prontuário
    const medicalRecord = new MedicalRecord({ user_id, specialist_id, appointment_id, date, notes });
    await medicalRecord.save();

    res.status(201).json({ message: 'Prontuário criado com sucesso!', medicalRecord });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar prontuário', error });
  }
};

/**
 * Lista todos os prontuários cadastrados.
 */
export const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
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
};

/**
 * Lista os prontuários de um paciente específico.
 */
export const getMedicalRecordsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const records = await MedicalRecord.find({ user_id })
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
};

/**
 * Lista os prontuários feitos por um especialista específico.
 */
export const getMedicalRecordsBySpecialist = async (req, res) => {
  try {
    const { specialist_id } = req.params;

    const records = await MedicalRecord.find({ specialist_id })
      .populate('user_id', 'name email phone')
      .populate('appointment_id', 'date hour');

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar prontuários do especialista', error });
  }
};

/**
 * Exclui um prontuário pelo ID.
 */
export const deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await MedicalRecord.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).json({ message: 'Prontuário não encontrado!' });
    }

    res.status(200).json({ message: 'Prontuário excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir prontuário', error });
  }
};
