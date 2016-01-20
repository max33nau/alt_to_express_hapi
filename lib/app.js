"use strict";

var startServer = require('./server');
var startDB = require('./database');

var dbInfo = startDB();
var mainServer = startServer();
// Functions in these are callbacks so both server and db are running
mainServer.start( function(error){
  if(error) {
    throw error;
  }
  console.log('server is running');
  dbInfo.start(function(){console.log('connection to database was a success');});
});
