var startServer = require('./server');
var startDB = require('./database');

var dbInfo = startDB();
startServer();
dbInfo.start();
