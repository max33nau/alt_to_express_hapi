"use strict";

var Hapi = require('hapi');
var myPort = 3030;
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: myPort
});

server.route([
  { method: 'GET', path:'/', handler: function(request,reply){
    return reply('hello world');
    }
  }
])
server.start( function(error){
  if(error) {
    throw error;
  }
  console.log('server is running');
})
