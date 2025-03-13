"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);

const transporter = _nodemailer2.default.createTransport({
  service: 'yahoo',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports. default = transporter;
