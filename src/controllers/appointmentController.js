import Appointment from '../models/Appointment.js';
import Schedule from '../models/Schedule.js';
import { io } from '../server.js';

export const createAppointment = async (req, res) => {
  try {
    const { user_id, specialty_id, specialist_id, date, hour, orgao_id, status } = req.body;
    console.log(user_id, specialty_id,specialist_id, date, hour, orgao_id)

    // Verifica se o horário está disponível
    const schedule = await Schedule.findOne({ orgao_id, specialty_id, user_id: specialist_id, date, status });
    if (schedule) {
      console.log('Horários salvos:', schedule.hours);
    }
    if (!schedule || !schedule.hours.includes(hour)) {
      return res.status(400).json({ message: 'Horário não disponível!' });
    }

    // Cria a consulta
    const appointment = new Appointment({ user_id, specialty_id, specialist_id, date, hour, orgao_id, status });
    await appointment.save();

    // Remove o horário agendado da agenda
    schedule.hours = schedule.hours.filter(h => h !== hour);
    await schedule.save();

    io.emit('appointmentUpdated', { message: 'Novo agendamento criado' });

    res.status(201).json({ message: 'Consulta marcada com sucesso!', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao marcar consulta', error });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('user_id specialty_id orgao_id');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consultas', error });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  try {
    const { specialist_id } = req.params;
    
    // Popula specialty_id, user_id (pegando name e email), e specialist_id (pegando name e email)
    const appointments = await Appointment.find({ specialist_id })
      .populate('specialty_id', 'name')  // Popula specialty_id com o campo name
      .populate('user_id', 'name email phone')  // Popula o user_id com name e email
      .populate('specialist_id', 'name email phone')  // Popula o specialist_id com name e email
      .populate('orgao_id')  // Popula os dados de orgao_id, se necessário

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consultas do usuário', error });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status)
    if (!["realizada", "cancelada"].includes(status)) {
      return res.status(400).json({ message: "Status inválido!" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Consulta não encontrada!" });
    }

    res.status(200).json({ message: "Status atualizado com sucesso!", appointment });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar status", error });
  }
};



export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Consulta não encontrada!' });
    }

    // Re-adiciona o horário à agenda
    const schedule = await Schedule.findOne({ orgao_id: appointment.orgao_id, specialty_id: appointment.specialty_id, date: appointment.date });
    if (schedule) {
      schedule.hours.push(appointment.hour);
      schedule.hours.sort();
      await schedule.save();
    }

    res.status(200).json({ message: 'Consulta cancelada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar consulta', error });
  }
};
