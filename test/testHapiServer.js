"use strict";
var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

var startServer = require('../lib/server');
var startDB = require('../lib/database');



describe('alternative to express using hapi/mongooose mongo ', function() {

  var dbInfo = startDB();


  before(function(done) {
    startServer(done);
    dbInfo.start(done);
  });



  it('should put a new file in the data folder', function() {

  });


  after(function(done) {

  }
});
