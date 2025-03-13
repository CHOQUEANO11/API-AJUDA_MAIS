"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/routes/orgRoutes.js

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _orgControllerjs = require('../controllers/orgController.js');
var _authMiddlewarejs = require('../middlewares/authMiddleware.js');


const router = _express2.default.Router();

// Rota para criar órgão
router.post('/org', _orgControllerjs.createOrg);
router.get('/orgs', _authMiddlewarejs.authenticateToken, _orgControllerjs.getAllOrgs);
router.put('/org/:id', _authMiddlewarejs.authenticateToken, _orgControllerjs.updateOrg);
router.delete('/org/:id', _authMiddlewarejs.authenticateToken, _orgControllerjs.deleteOrg);

exports. default = router;
