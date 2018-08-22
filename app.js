const express = require('express');
const  path = require('path');
const  cookieParser =  require('cookie-parser');
const bodyParser = require('body-parser');
const  model = require('./models');
const  http = require('http');
const socketio = require('socket.io');

const app = express();

function configApp(){
  app.use(bodyParser.json({type: 'application/json'}));
  app.use(bodyParser.urlencoded({extends: false}));
  app.use(cookieParser());
}
configApp();

app.listen(3000, function(){
  console.log('listening on *:3000');
});