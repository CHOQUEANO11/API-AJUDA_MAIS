"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _userSpecialtyControllerjs = require('../controllers/userSpecialtyController.js');
var _multerConfigjs = require('../config/multerConfig.js'); var _multerConfigjs2 = _interopRequireDefault(_multerConfigjs);
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');


const router = _express2.default.Router();


// Rota para criar usuários especialistas com upload de foto
router.post('/specialtyUser', _multerConfigjs2.default.single('photo'), _userSpecialtyControllerjs.createSpecialtyUser);
router.get('/specialtyUsers', _authMiddlewarejs.authenticateToken, _userSpecialtyControllerjs.getSpecialtyUsers);
// router.get('/getUser', authenticateToken, getUser);
router.get('/specialtyUser/:id', _authMiddlewarejs.authenticateToken, _userSpecialtyControllerjs.getSpecialtyUser);
router.get('/specialtyOrg/:orgao_id', _authMiddlewarejs.authenticateToken, _userSpecialtyControllerjs.getSpecialtyUsersByOrgao);
router.put('/update/:id', _authMiddlewarejs.authenticateToken, _userSpecialtyControllerjs.updateSpecialtyUser);
router.delete('/delete/:id', _authMiddlewarejs.authenticateToken, _userSpecialtyControllerjs.deleteSpecialtyUser);


exports. default = router;
