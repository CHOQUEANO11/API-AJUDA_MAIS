"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Appointmentjs = require('../models/Appointment.js'); var _Appointmentjs2 = _interopRequireDefault(_Appointmentjs);
var _Schedulejs = require('../models/Schedule.js'); var _Schedulejs2 = _interopRequireDefault(_Schedulejs);
var _serverjs = require('../server.js');

 const createAppointment = async (req, res) => {
  try {
    const { user_id, specialty_id, specialist_id, date, hour, orgao_id, status } = req.body;
    console.log(user_id, specialty_id, specialist_id, date, hour, orgao_id);

    // Verifica se o horário está disponível
    const schedule = await _Schedulejs2.default.findOne({ orgao_id, specialty_id, user_id: specialist_id, date, status });
    if (schedule) {
      console.log('Horários salvos:', schedule.hours);
    }
    if (!schedule || !schedule.hours.includes(hour)) {
      return res.status(400).json({ message: 'Horário não disponível!' });
    }

    // Cria a consulta
    const appointment = new (0, _Appointmentjs2.default)({ user_id, specialty_id, specialist_id, date, hour, orgao_id, status });
    await appointment.save();

    // Remove o horário agendado da agenda
    schedule.hours = schedule.hours.filter(h => h !== hour);
    await schedule.save();

    // Emitir o evento para notificar os clientes conectados sobre o novo agendamento
    _serverjs.io.emit('appointmentUpdated', { message: 'Novo agendamento criado', appointment });

    res.status(201).json({ message: 'Consulta marcada com sucesso!', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao marcar consulta', error });
  }
}; exports.createAppointment = createAppointment;

 const getAppointmentsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // Popula specialty_id, user_id (pegando name e email), e specialist_id (pegando name e email)
    const appointments = await _Appointmentjs2.default.find({ user_id })
      .populate('specialty_id', 'name')  // Popula specialty_id com o campo name
      .populate('user_id', 'name email phone')  // Popula o user_id com name, email e telefone
      .populate('specialist_id', 'name email phone')  // Popula o specialist_id com name, email e telefone
      .populate('orgao_id');  // Popula os dados de orgao_id, se necessário

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consultas do usuário', error });
  }
}; exports.getAppointmentsByUserId = getAppointmentsByUserId;


 const getAppointments = async (req, res) => {
  try {
    const appointments = await _Appointmentjs2.default.find().populate('user_id specialty_id orgao_id');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consultas', error });
  }
}; exports.getAppointments = getAppointments;

 const getAppointmentsByUser = async (req, res) => {
  try {
    const { specialist_id } = req.params;    
    // Popula specialty_id, user_id (pegando name e email), e specialist_id (pegando name e email)
    const appointments = await _Appointmentjs2.default.find({ specialist_id })
      .populate('specialty_id', 'name')  // Popula specialty_id com o campo name
      .populate('user_id', 'name email phone')  // Popula o user_id com name e email
      .populate('specialist_id', 'name email phone')  // Popula o specialist_id com name e email
      .populate('orgao_id')  // Popula os dados de orgao_id, se necessário

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consultas do usuário', error });
  }
}; exports.getAppointmentsByUser = getAppointmentsByUser;

 const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status)
    if (!["realizada", "cancelada"].includes(status)) {
      return res.status(400).json({ message: "Status inválido!" });
    }

    const appointment = await _Appointmentjs2.default.findByIdAndUpdate(
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
}; exports.updateAppointmentStatus = updateAppointmentStatus;



 const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await _Appointmentjs2.default.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Consulta não encontrada!' });
    }

    // Re-adiciona o horário à agenda
    const schedule = await _Schedulejs2.default.findOne({ orgao_id: appointment.orgao_id, specialty_id: appointment.specialty_id, date: appointment.date });
    if (schedule) {
      schedule.hours.push(appointment.hour);
      schedule.hours.sort();
      await schedule.save();
    }

    res.status(200).json({ message: 'Consulta cancelada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar consulta', error });
  }
}; exports.deleteAppointment = deleteAppointment;
