"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/routes/orgRoutes.js

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _emotionUserControllerjs = require('../controllers/emotionUserController.js');
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');


const router = _express2.default.Router();

// Rota para criar órgão
router.post('/emotionUser', _emotionUserControllerjs.createEmotionUser);
router.get('/emotionsUser/:user_id', _authMiddlewarejs.authenticateToken, _emotionUserControllerjs.getEmotionsByUser);
router.put('/emotionUser/:id', _authMiddlewarejs.authenticateToken, _emotionUserControllerjs.updateEmotionUser);
router.delete('/emotionUser/:id', _authMiddlewarejs.authenticateToken, _emotionUserControllerjs.deleteEmotionUser);

exports. default = router;
