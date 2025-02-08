// src/server.js

import dotenv from 'dotenv';
dotenv.config();  // Carrega as variáveis de ambiente do .env

import express from 'express';
import { json, urlencoded } from 'express';  // Usando os middlewares integrados do Express
import connectDB from './config/db.js';
import path from 'path';
import cors from 'cors';


// Import routes
import orgRoutes from './routes/orgRoutes.js';
import specialtyRoutes from './routes/specialtyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authSpecialty from './routes/userSpecialtyRoutes.js'
import userSpecialty from './routes/userSpecialtyRoutes.js'
import perfilRoutes from './routes/perfilRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js'

const app = express();

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middlewares
app.use(json());  // Middleware para analisar JSON
app.use(urlencoded({ extended: true }));  // Middleware para lidar com dados URL-encoded

// Connect to DB
connectDB();

app.use(cors({
  origin: '*', // Permite apenas a origem do seu frontend (ajuste conforme necessário)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Se precisar de cookies ou outras credenciais
}));
// Routes
app.use('/orgao', orgRoutes);
app.use('/specialty', specialtyRoutes);
app.use('/usuario', userRoutes);
app.use('/login', authRoutes);
app.use('/login', authSpecialty)
app.use('/specialtyUser', userSpecialty)
app.use('/perfil', perfilRoutes);
app.use('/schedule', scheduleRoutes)



// const PORT = process.env.PORT || 3001;
// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const port = process.env.PORT || 3333;  // Se não encontrar a variável, usa a porta 10000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
