"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/models/Org.js

var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const OrgSchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
});

const Org = _mongoose2.default.model('Org', OrgSchema);

// Exportando como default
exports. default = Org;
