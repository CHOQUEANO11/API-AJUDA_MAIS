// src/server.js

import dotenv from 'dotenv';
dotenv.config();  // Carrega as variáveis de ambiente do .env

import express from 'express';
import { json, urlencoded } from 'express';  // Usando os middlewares integrados do Express
import connectDB from './config/db.js';
import path from 'path';
import cors from 'cors';
import http from 'http';  // Importando o http para criar um servidor
import { Server } from 'socket.io';  // Importando o Socket.IO


// Import routes
import orgRoutes from './routes/orgRoutes.js';
import specialtyRoutes from './routes/specialtyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authSpecialty from './routes/userSpecialtyRoutes.js'
import userSpecialty from './routes/userSpecialtyRoutes.js'
import perfilRoutes from './routes/perfilRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js'
import emotionRoutes from './routes/emotionRoutes.js'
import emotionUserRoutes from './routes/emotionUserRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import medicalRecordRoutes from './routes/medicalRecordRoutes.js'

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // 🔥 Certifique-se de que a origem do frontend está correta
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"], // 🔥 Força WebSocket
});

// Configurar o Socket.IO
app.use(cors({
  origin: "http://localhost:3000", // 🔥 Ajuste para a URL do seu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middlewares
app.use(json());  // Middleware para analisar JSON
app.use(urlencoded({ extended: true }));  // Middleware para lidar com dados URL-encoded

// Connect to DB
connectDB();

app.use(cors({
  origin: "*", // Ajuste para o seu frontend em produção
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
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
app.use('/emotion', emotionRoutes);
app.use('/emotionUser', emotionUserRoutes)
app.use('/appointment', appointmentRoutes)
app.use('/medicalRecord', medicalRecordRoutes)

io.on("connection", (socket) => {
  console.log("✅ Novo cliente conectado via WebSocket!", socket.id);

  setTimeout(() => {
    console.log("🚀 Emitindo evento de teste...");
    io.emit("appointmentUpdated", { message: "Teste de evento após conexão" });
  }, 5000);

  socket.on("appointmentCreated", (data) => {
    console.log("📅 Novo agendamento criado:", data);
    io.emit("appointmentUpdated", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado", socket.id);
  });
});


setTimeout(() => {
  io.emit("appointmentUpdated", { message: "Teste de evento" });
}, 5000);
// Exportar o servidor e a instância do `io`
export { server, io };






// const PORT = process.env.PORT || 3001;
// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const port = process.env.PORT || 3333;  // Se não encontrar a variável, usa a porta 10000

server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

