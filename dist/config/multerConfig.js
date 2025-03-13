"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

// Configuração do multer para salvar arquivos em 'uploads/'
const storage = _multer2.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define a pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nome do arquivo único
  },
});

// Filtro para aceitar apenas arquivos de imagem
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Arquivo não é uma imagem!'), false);
  }
};

// Inicializar o Multer
const upload = _multer2.default.call(void 0, { storage, fileFilter });

exports. default = upload;
