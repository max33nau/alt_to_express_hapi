"use strict";
require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

var startServer = require('../lib/server');
var startDB = require('../lib/database');



describe('alternative to express using hapi/mongooose', function() {

  var dbInfo = startDB();
  var personAdded = '';
  var personsFavoriteSport = '';
  var server = startServer();


  before(function(done) {
    server.start(function(){
      console.log('server is running');
      dbInfo.start(done);
    });
  });

  it('should give a response where the content type is html for home page', function(done) {
    chai.request('localhost:3030')
      .get('/')
      .end(function(error, response) {
        expect(error).to.be.null;
        expect(response.header['content-type']).to.deep.equal('text/html');
        expect(response).to.have.status(200);
        done();
      });
  });


  it('should add joe to the database using a POST request (create)', function(done) {
    chai.request('localhost:3030')
      .post('/sport')
      .send({
        "username": "joe",
        "sport": "football"
      })
      .end(function(error, response) {
        expect(error).to.be.null;
        var userData = response.text.split(' ');
        personAdded = userData[0];
        personsFavoriteSport = userData[userData.length-1];
        expect(personAdded).to.deep.equal('joe');
        expect(personsFavoriteSport).to.deep.equal('football');
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should get all the people with the favorite sport of football (read)', function(done){
    chai.request('localhost:3030')
      .get('/sport/'+personsFavoriteSport)
      .end(function(error, response) {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should update joes favorite sport to basketball (update)', function(done){
    chai.request('localhost:3030')
      .put('/sport/update?username=joe&newsport=basketball')
      .end(function(error, response) {
        var wordUpdateArray = response.text.split(' ');
        personsFavoriteSport = wordUpdateArray[wordUpdateArray.length-1];
        expect(personsFavoriteSport).to.deep.equal('basketball');
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should delete the previous person just added to the database (remove)', function(done) {
    chai.request('localhost:3030')
      .delete('/user/'+personAdded)
      .end(function(error, response) {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });

  after(function(done){
    server.stop(function(){
      dbInfo.mongoose.connection.close(done);
    });
  });

});
