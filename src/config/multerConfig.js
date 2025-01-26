import multer from 'multer';

// Configuração do multer para salvar arquivos em 'uploads/'
const storage = multer.diskStorage({
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
const upload = multer({ storage, fileFilter });

export default upload;
