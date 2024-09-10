/**
 * @fileoverview Middleware para autenticação de requisições usando JWT (JSON Web Token).
 * @requires jsonwebtoken
 */
const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar a presença e validade de um token JWT.
 * Este middleware extrai o token do cabeçalho da requisição ('x-auth-token'), verifica sua validade usando a chave JWT fornecida nas variáveis de 
 * ambiente, e anexa os dados decodificados do usuário ao objeto da requisição ('req.user'), permitindo que a próxima função de middleware ou rota 
 * acesse as informações do usuário. Caso o token esteja ausente ou inválido, retorna um status de erro 401.
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta.
 * @param {Function} next - Função para passar para o próximo middleware ou rota.
 * @returns {void}
 */
module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.CHAVE_JWT);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
