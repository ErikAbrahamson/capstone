process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app.js');
var Task = require('../../src/server/models/Task');

var should = chai.should();
chai.use(chaiHttp);

describe('Task', function() {

  Task.collection.drop();
  var date = new Date();
  date.setDate(date.getDate() + 10 /*days*/);

  beforeEach(function(done) {

    var newUser = new User({
      title: 'test@test.com',
      password: 'test',
      phone: '123-456-7890',
      twitter: '@user',
      tasks:[newTask]
    });
    var newTask = new Task({
      title: 'Finish Tests',
      description: 'I\'d better finish these tests',
      deadline: date,
      priority: 10,
      complete: false,
      severity: 10,
      punishment_type : {
        donation: true,
        twitter_post: false
      }
    });
    var secondTask = new Task({
      title: 'Seriously, finish tests',
      description: 'I\'d better finish these damn tests',
      deadline: date,
      priority: 10,
      complete: false,
      severity: 10,
      punishment_type : {
        donation: false,
        twitter_post: true
      }
    });

    newTask.save(function(error) { done(); });
    secondTask.save(function(error) { done(); });
    newUser.save(function(error) { done(); });
  });
  afterEach(function(done) {
    User.collection.drop();
    Task.collection.drop();
    done();
  });

  //get all Task samples
  it('Should return all tasks for a user', function(done) {

    var id = response.body[0]._id,
    update = { $pushAll : { tasks : [newTask, secondTask] }},
    options = { new:true };

    chai.request(server)
      .get('/user/' + id + '/tasks')
      .end(function(error, res){
        res.should.have.status(200);
        res.body.success.should.be.a('array');
        res.body.success.length.should.equal(2);
        res.body.success[0].should.have.property('title');
        res.body.success[0].should.have.property('description');
        res.body.success[1].should.have.property('deadline');
        res.body.success[1].should.have.property('priority');
        done();
      });
    });


});
