const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res , next)=> {
  const token = req.headers.authorization;
  if(typeof token !== 'undefined'){
    jwt.verify(token, config.salt, (err, decoded) => {
      if(!err && decoded){
        console.log(decoded);
        req.token = decoded;
      }
    });
  }
  next();
}