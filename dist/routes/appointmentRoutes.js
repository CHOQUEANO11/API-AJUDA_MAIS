"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _appointmentControllerjs = require('../controllers/appointmentController.js');
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');

const router = _express2.default.Router();

router.post('/appoint', _authMiddlewarejs.authenticateToken, _appointmentControllerjs.createAppointment);
router.get('/appointments', _authMiddlewarejs.authenticateToken, _appointmentControllerjs.getAppointments);
router.put('/appointments/:id/status', _appointmentControllerjs.updateAppointmentStatus);

router.get('/appointments/user/:user_id', _authMiddlewarejs.authenticateToken, _appointmentControllerjs.getAppointmentsByUserId);
router.get('/appointments/specialist/:specialist_id', _authMiddlewarejs.authenticateToken, _appointmentControllerjs.getAppointmentsByUser);
// router.put('/appointments/:id', authenticateToken, updateAppointment);
router.delete('/appointments/:id', _authMiddlewarejs.authenticateToken, _appointmentControllerjs.deleteAppointment);

exports. default = router;