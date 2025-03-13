"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/routes/orgRoutes.js

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _emotionControllerjs = require('../controllers/emotionController.js');
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');


const router = _express2.default.Router();

// Rota para criar órgão
router.post('/emotion', _emotionControllerjs.createEmotion);
router.get('/emotions', _authMiddlewarejs.authenticateToken, _emotionControllerjs.getEmotions);
router.put('/emotion/:id', _authMiddlewarejs.authenticateToken, _emotionControllerjs.updateEmotion);
router.delete('/emotion/:id', _authMiddlewarejs.authenticateToken, _emotionControllerjs.deleteEmotion);

exports. default = router;
