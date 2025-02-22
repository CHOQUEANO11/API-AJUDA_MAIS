import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { json, urlencoded } from 'express';
import connectDB from './config/db.js';
import path from 'path';
import cors from 'cors';

// Import das rotas
import orgRoutes from './routes/orgRoutes.js';
import specialtyRoutes from './routes/specialtyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userSpecialty from './routes/userSpecialtyRoutes.js';
import perfilRoutes from './routes/perfilRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import emotionRoutes from './routes/emotionRoutes.js';
import emotionUserRoutes from './routes/emotionUserRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import medicalRecordRoutes from './routes/medicalRecordRoutes.js';

const app = express();

// Configurar CORS corretamente
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));

// Conectar ao banco de dados
connectDB();

// Definir as rotas
app.use('/orgao', orgRoutes);
app.use('/specialty', specialtyRoutes);
app.use('/usuario', userRoutes);
app.use('/login', authRoutes);
app.use('/specialtyUser', userSpecialty);
app.use('/perfil', perfilRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/emotion', emotionRoutes);
app.use('/emotionUser', emotionUserRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/medicalRecord', medicalRecordRoutes);

// Iniciar servidor Express diretamente
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
