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


  before(function(cb, done) {
    startServer(cb);
    dbInfo.start(done);
  });

  it('should give a response where the content type is html for home page', function(done) {
    chai.request('localhost:3030')
      .get('/')
      .end(function(error, response) {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });


});
