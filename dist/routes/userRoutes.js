"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _userControllerjs = require('../controllers/userController.js');
var _multerConfigjs = require('../config/multerConfig.js'); var _multerConfigjs2 = _interopRequireDefault(_multerConfigjs);
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');


const router = _express2.default.Router();


router.post('/', _multerConfigjs2.default.single('photo'), _userControllerjs.createUser);
// router.get('/user', authenticateToken, getUser);
router.get('/getUser', _authMiddlewarejs.authenticateToken, _userControllerjs.getUser);
router.get('/getUser/:orgao_id', _authMiddlewarejs.authenticateToken, _userControllerjs.getSpecialtyUsersByOrgao);
router.get('/users', _authMiddlewarejs.authenticateToken, _userControllerjs.getUsers);
router.put('/user/:id', _authMiddlewarejs.authenticateToken, _userControllerjs.updateUser);
router.delete('/user/:id', _authMiddlewarejs.authenticateToken, _userControllerjs.deleteUser);

exports. default = router;
