"use strict";

var Hapi = require('hapi');
var Path = require('path');
var inert = require('inert');


module.exports = function startServer() {

  var config = require('./server-db-info');
  var my = config();
  var routes =require('./routes.js');

  var server = new Hapi.Server({
    connections: {
      routes: {
        files: {
          relativeTo: Path.join(__dirname, 'public') // base path in my server
        }
      }
    }
  });

  server.connection({
    host: my.serverHost,
    port: process.env.PORT || my.serverPort
  });

  server.register(require('vision'), function(error){
    if(error) {
      console.log('failed to install plug in because: ', error);
    }
    server.views({
      engines: {
        html: require('jade')
      },
      relativeTo: __dirname,
      path:'public'
    });
  });


  server.route(routes.rest)

  server.start( function(error){
    if(error) {
      throw error;
    }
    console.log('server is running');
  })

}
