module.exports = function config() {
  var my = {};
  my.serverHost = 'localhost';
  my.serverPort = 3030;
  my.dbHost = 'mongodb://localhost/'
  my.dbName = 'SportDB'
  return my;
}
