"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);






var _medicalRecordControllerjs = require('../controllers/medicalRecordController.js');

const router = _express2.default.Router();

router.post('/', _medicalRecordControllerjs.createMedicalRecord); // Criar prontuário
router.get('/', _medicalRecordControllerjs.getMedicalRecords); // Listar todos os prontuários
router.get('/user/:user_id', _medicalRecordControllerjs.getMedicalRecordsByUser); // Listar prontuários por paciente
router.get('/specialist/:specialist_id', _medicalRecordControllerjs.getMedicalRecordsBySpecialist); // Listar prontuários por especialista
router.delete('/:id', _medicalRecordControllerjs.deleteMedicalRecord); // Deletar um prontuário

exports. default = router;
