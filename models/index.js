var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  'chatApp',
  'root',
  'dsm10120',
  {
    'host': 'localhost',
    'port': 3306,
    'dialect' : 'mysql'
  }
  );

var db = {};

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

module.exports = {db, Sequelize, sequelize};