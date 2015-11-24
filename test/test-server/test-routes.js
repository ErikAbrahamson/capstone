process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app.js');

var should = chai.should();
chai.use(chaiHttp);

describe('Root connection', function() {
  it('should return a 200 status', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('User logout', function() {
  it('should return a 200 status', function(done) {
    chai.request(server)
    .get('/user/logout')
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });
});
