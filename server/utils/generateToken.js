const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id },'shaan123', { expiresIn: '30d' });
};

module.exports = generateToken;
