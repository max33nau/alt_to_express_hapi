"use strict";

var mongoose = require('mongoose');
var config = require('./server-db-info');


module.exports = function startDB() {
  var dbInfo = {};
  var my = config();
  var db;
  dbInfo.start = function(callback) {
    mongoose.connect(my.dbHost + my.dbName);

    db = mongoose.connection;

    db.on('error', function(error) {
      console.log(error);
      db.close();
    });

    db.once('open', callback);
  };
  dbInfo.mongoose = mongoose;
  dbInfo.db = db;
  return dbInfo;

};
