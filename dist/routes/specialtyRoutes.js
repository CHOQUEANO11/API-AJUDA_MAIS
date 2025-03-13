"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/routes/specialtyRoutes.js

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _specialtyControllerjs = require('../controllers/specialtyController.js'); 
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');


const router = _express2.default.Router();

// Rota para criar uma especialidade
router.post('/specialty', _authMiddlewarejs.authenticateToken, _specialtyControllerjs.createSpecialty);
router.get('/specialty', _authMiddlewarejs.authenticateToken, _specialtyControllerjs.getSpecialty);
router.get('/specialty/:orgao_id', _authMiddlewarejs.authenticateToken, _specialtyControllerjs.getSpecialtiesByOrgao);
router.put('/specialty/:id', _authMiddlewarejs.authenticateToken, _specialtyControllerjs.updateSpecialty);
router.delete('/specialty/:id', _authMiddlewarejs.authenticateToken, _specialtyControllerjs.deleteSpecialty);



// Exportação padrão
exports. default = router;
