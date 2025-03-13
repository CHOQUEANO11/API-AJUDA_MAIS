"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/routes/orgRoutes.js

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _scheduleControllerjs = require('../controllers/scheduleController.js');
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');


const router = _express2.default.Router();

// Rota para criar órgão
router.post('/schedule', _authMiddlewarejs.authenticateToken, _scheduleControllerjs.createSchedule);
router.get('/schedule', _authMiddlewarejs.authenticateToken, _scheduleControllerjs.getSchedules);
router.get('/schedule/:specialty_id', _authMiddlewarejs.authenticateToken, _scheduleControllerjs.getSchedulesBySpecialty);
router.get('/schedu/:user_id', _authMiddlewarejs.authenticateToken, _scheduleControllerjs.getSchedulesByUser);
router.get('/schedules/:orgao_id', _scheduleControllerjs.getUserSchedules);
router.put('/schedule/:id', _authMiddlewarejs.authenticateToken, _scheduleControllerjs.updateSchedule);
router.delete('/schedule/:id', _authMiddlewarejs.authenticateToken, _scheduleControllerjs.deleteSchedule);

exports. default = router;
