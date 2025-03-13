"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/routes/orgRoutes.js

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _perfilControllerjs = require('../controllers/perfilController.js');
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');


const router = _express2.default.Router();

// Rota para criar órgão
router.post('/perfil', _authMiddlewarejs.authenticateToken, _perfilControllerjs.createPerfil);
router.get('/perfil', _authMiddlewarejs.authenticateToken, _perfilControllerjs.getAllPerfil);
router.put('/perfil/:id', _authMiddlewarejs.authenticateToken, _perfilControllerjs.updatePerfil);
router.delete('/perfil/:id', _authMiddlewarejs.authenticateToken, _perfilControllerjs.deletePerfil);

exports. default = router;
