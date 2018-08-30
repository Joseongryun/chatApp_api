const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const config = require('./config/config');
const routes = require('./routes');

const app = express();

function configApp() {
  app.use(bodyParser.json({
    type: 'application/json'
  }));
  app.use(bodyParser.urlencoded({
    extends: false
  }));
  app.use(cookieParser());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //1
    next();
  });
  app.use(require('./utils/JWT'));
  app.use('/',routes);
}

configApp();

app.listen(config.port, function () {
  console.log('listening on *:' + config.port);
});