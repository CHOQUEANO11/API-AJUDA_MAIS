"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

 const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Token após "Bearer "

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Anexa as informações do usuário à requisição
    req.user = user;
    next();
  });
}; exports.authenticateToken = authenticateToken;
