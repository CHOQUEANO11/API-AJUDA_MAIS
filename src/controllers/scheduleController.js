import Schedule from "../models/Schedule.js";
import UserSpecialty from "../models/UserSpecialty.js";

/**
 * Cria um novo agendamento
 */
export const createSchedule = async (req, res) => {
  try {
    const { org_id, user_id, specialty_id, date, hours } = req.body;

    if (!org_id || !user_id || !specialty_id || !date || !hours.length) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Busca o usuário associado à especialidade
    // const userSpecialty = await UserSpecialty.findOne({ specialty_id });
    // console.log('USER', userSpecialty)

    // if (!userSpecialty) {
    //   return res.status(404).json({ message: "Especialista não encontrado." });
    // }

    // // Obtém o user_id do especialista
    // const user_id = userSpecialty?.specialty_id?._id;

    // Criar um novo agendamento
    const newSchedule = new Schedule({ org_id, specialty_id, user_id, date, hours });
    await newSchedule.save();

    res.status(201).json({ message: "Agendamento criado com sucesso!", data: newSchedule });
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar o agendamento.", error: error.message });
  }
};

export const getUserSchedules = async (req, res) => {
  try {
    const { specialty_id } = req.params; // Pega o ID do usuário da URL

    if (!specialty_id) {
      return res.status(400).json({ message: "O ID do usuário é obrigatório." });
    }

    // Busca os agendamentos do usuário e popula o nome do especialista
    const schedules = await Schedule.find({ specialty_id }).populate("specialty_id", "name");

    if (!schedules.length) {
      return res.status(404).json({ message: "Nenhum agendamento encontrado." });
    }

    res.status(200).json({ message: "Agendamentos encontrados!", data: schedules });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamentos.", error: error.message });
  }
};


export const getSchedulesBySpecialty = async (req, res) => {
  
  try {
    const { specialty_id } = req.params;

    if (!specialty_id) {
      return res.status(400).json({ error: "O ID do especialista é obrigatório." });
    }

    // Busca os agendamentos e popula o nome do especialista
    const schedules = await Schedule.find({ specialty_id })
      .populate("specialty_id", "name") // Trazendo apenas o nome do especialista
      .sort({ date: 1, hours: 1 });

    if (!schedules.length) {
      return res.status(404).json({ message: "Nenhum agendamento encontrado para este especialista." });
    }

    res.status(200).json(schedules);
  } catch (error) {
    console.error("Erro ao buscar os agendamentos:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export const getSchedulesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;  // Usando user_id recebido da URL
    // const {specialty_id} = req.body

    if (!user_id) {
      return res.status(400).json({ error: "O ID do usuário é obrigatório." });
    }

    // Busca os agendamentos do usuário e popula o nome do especialista
    const schedules = await Schedule.find({ user_id })
      .populate("specialty_id", "name") // Trazendo apenas o nome do especialista
      .sort({ date: 1, hours: 1 });  // Ordenando pela data e hora

    if (!schedules.length) {
      return res.status(404).json({ message: "Nenhum agendamento encontrado para este usuário." });
    }

    res.status(200).json(schedules);  // Retorna os agendamentos encontrados
  } catch (error) {
    console.error("Erro ao buscar os agendamentos:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};


/**
 * Lista todos os agendamentos com filtros opcionais
 */
export const getSchedules = async (req, res) => {
  try {
    const { org_id, specialty_id, date } = req.query;

    let query = {};
    if (org_id) query.org_id = org_id;
    if (specialty_id) query.specialty_id = specialty_id;
    if (date) query.date = date;

    const schedules = await Schedule.find(query).sort({ date: 1 });

    res.status(200).json({ message: "Agendamentos encontrados!", data: schedules });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamentos.", error: error.message });
  }
};

/**
 * Edita um agendamento existente
 */
export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.query; // ID do agendamento a ser atualizado
    const { date, hours } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID do agendamento é obrigatório." });
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { date, hours },
      { new: true, runValidators: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json({ message: "Agendamento atualizado com sucesso!", data: updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar agendamento.", error: error.message });
  }
};

/**
 * Deleta um agendamento pelo ID
 */
export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID do agendamento é obrigatório." });
    }

    const deletedSchedule = await Schedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json({ message: "Agendamento excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir agendamento.", error: error.message });
  }
};
