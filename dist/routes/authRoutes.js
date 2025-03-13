"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/routes/authRoutes.js

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _authControllerjs = require('../controllers/authController.js'); var _authControllerjs2 = _interopRequireDefault(_authControllerjs); // Certifique-se de que o caminho está correto
var _authSpecialtyControllerjs = require('../controllers/authSpecialtyController.js'); var _authSpecialtyControllerjs2 = _interopRequireDefault(_authSpecialtyControllerjs);

const router = _express2.default.Router();

router.post('/', _authControllerjs2.default);
router.post('/specialty', _authSpecialtyControllerjs2.default);

exports. default = router; // Exportação padrão para o router
