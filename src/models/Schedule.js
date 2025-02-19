import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orgao_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Org",
    required: true,
  },
  specialty_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialty",
    required: true,
  },
  date: {
    type: String, // Armazenado no formato "YYYY-MM-DD"
    required: true,
  },
  hours: {
    type: [String], // Lista de horários, ex: ["09:00", "10:30", "14:00"]
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
