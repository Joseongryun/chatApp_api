const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
  var secret = config.salt;
  const token = req.headers.authorization;
  if (typeof token !== 'undefined') {
    jwt.verify(token, secret, (err, decoded) => {
      if (!err && decoded) {
        req.token = decoded;
      }
    });
  }
  next();
}