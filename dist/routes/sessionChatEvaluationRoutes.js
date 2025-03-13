"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/routes/orgRoutes.js

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _sessionChatEvaluationControllerjs = require('../controllers/sessionChatEvaluationController.js');
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');


const router = _express2.default.Router();

router.get('/getsessionchat', _sessionChatEvaluationControllerjs.listAllSessions);
router.get('/getsessionchat/:id', _sessionChatEvaluationControllerjs.getSessionById);
router.post('/createsession', _sessionChatEvaluationControllerjs.createSession);
router.patch('/updatesession/:id', _sessionChatEvaluationControllerjs.updateSession);
router.patch(
  '/sessions/finalize/:id',
  _sessionChatEvaluationControllerjs.finalizeSession
);

//rotas 


exports. default = router;
