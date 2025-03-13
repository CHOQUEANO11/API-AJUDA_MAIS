"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _dbjs = require('./config/db.js'); var _dbjs2 = _interopRequireDefault(_dbjs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _socketio = require('socket.io');  // Alterado para a importação correta

// Import das rotas
var _orgRoutesjs = require('./routes/orgRoutes.js'); var _orgRoutesjs2 = _interopRequireDefault(_orgRoutesjs);
var _specialtyRoutesjs = require('./routes/specialtyRoutes.js'); var _specialtyRoutesjs2 = _interopRequireDefault(_specialtyRoutesjs);
var _userRoutesjs = require('./routes/userRoutes.js'); var _userRoutesjs2 = _interopRequireDefault(_userRoutesjs);
var _authRoutesjs = require('./routes/authRoutes.js'); var _authRoutesjs2 = _interopRequireDefault(_authRoutesjs);
var _userSpecialtyRoutesjs = require('./routes/userSpecialtyRoutes.js'); var _userSpecialtyRoutesjs2 = _interopRequireDefault(_userSpecialtyRoutesjs);
var _perfilRoutesjs = require('./routes/perfilRoutes.js'); var _perfilRoutesjs2 = _interopRequireDefault(_perfilRoutesjs);
var _scheduleRoutesjs = require('./routes/scheduleRoutes.js'); var _scheduleRoutesjs2 = _interopRequireDefault(_scheduleRoutesjs);
var _emotionRoutesjs = require('./routes/emotionRoutes.js'); var _emotionRoutesjs2 = _interopRequireDefault(_emotionRoutesjs);
var _emotionUserRoutesjs = require('./routes/emotionUserRoutes.js'); var _emotionUserRoutesjs2 = _interopRequireDefault(_emotionUserRoutesjs);
var _appointmentRoutesjs = require('./routes/appointmentRoutes.js'); var _appointmentRoutesjs2 = _interopRequireDefault(_appointmentRoutesjs);
var _medicalRecordRoutesjs = require('./routes/medicalRecordRoutes.js'); var _medicalRecordRoutesjs2 = _interopRequireDefault(_medicalRecordRoutesjs);
var _sessionChatEvaluationRoutesjs = require('./routes/sessionChatEvaluationRoutes.js'); var _sessionChatEvaluationRoutesjs2 = _interopRequireDefault(_sessionChatEvaluationRoutesjs);


const app = _express2.default.call(void 0, );

// Criando o servidor HTTP para usar com o Socket.IO
const server = _http2.default.createServer(app);
const io = new (0, _socketio.Server)(server, {
  cors: {
    origin: "*", // Permite todas as origens, mas pode restringir conforme necessário
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});  // Inicializando o Socket.IO

exports.io = io;

// Configurar CORS corretamente
app.use(_cors2.default.call(void 0, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

const __dirname = _path2.default.resolve();
app.use('/uploads', _express2.default.static(_path2.default.join(__dirname, 'uploads')));

// Middlewares
app.use(_express.json.call(void 0, ));
app.use(_express.urlencoded.call(void 0, { extended: true }));

// Conectar ao banco de dados
_dbjs2.default.call(void 0, );

// Definir as rotas
app.use('/orgao', _orgRoutesjs2.default);
app.use('/specialty', _specialtyRoutesjs2.default);
app.use('/usuario', _userRoutesjs2.default);
app.use('/login', _authRoutesjs2.default);
app.use('/specialtyUser', _userSpecialtyRoutesjs2.default);
app.use('/perfil', _perfilRoutesjs2.default);
app.use('/schedule', _scheduleRoutesjs2.default);
app.use('/emotion', _emotionRoutesjs2.default);
app.use('/emotionUser', _emotionUserRoutesjs2.default);
app.use('/appointment', _appointmentRoutesjs2.default);
app.use('/medicalRecord', _medicalRecordRoutesjs2.default);
app.use('/chat', _sessionChatEvaluationRoutesjs2.default)

// Emitir o evento para notificar os clientes conectados sobre o novo agendamento
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Aqui você pode ouvir eventos específicos se precisar, por exemplo, para criar uma conexão individual.
});

// Modifique a sua função de criar agendamento para emitir o evento via Socket.IO

// Iniciar servidor Express diretamente
const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
