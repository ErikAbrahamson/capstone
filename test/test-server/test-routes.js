process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app.js');
var Task = require('../../src/server/models/task.js');
var User = require('../../src/server/models/user.js');

var should = chai.should();
chai.use(chaiHttp);

describe('Task', function() {

  Task.collection.drop();
  var date = new Date();
  date.setDate(date.getDate() + 10);

  beforeEach(function(done) {

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
    var newUser = new User({
      username: 'test@test.com',
      password: 'test',
      phone: '123-456-7890',
      twitter: '@user',
      tasks:[newTask, secondTask]
    });

    newTask.save();
    secondTask.save();
    newUser.save();
    done();

  });
  afterEach(function(done) {
    User.collection.drop();
    Task.collection.drop();
    done();
  });

  // get all users
  it('Should return all users and associated tasks', function(done) {
    chai.request(server)
      .get('/users/')
      .end(function(error, res) {
        res.should.have.status(200);
        res.body[0].should.have.property('_id');
        res.body[0].tasks.length.should.equal(2);
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('tasks');
        res.body[0].should.have.property('twitter');
        res.body[0].twitter.should.equal('@user');
        done();
      });
    });
  // get one user
  it('Should return a single user', function(done) {
    var newUser = new User({
      username: 'Rick',
      password: '12345',
      phone: '123-456-7890',
      twitter: '@username',
      tasks: []
    });
    newUser.save(function(error, data) {
      chai.request(server)
        .get('/user/' + data.id)
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          res.body.should.have.property('username');
          res.body.should.have.property('password');
          res.body.should.have.property('twitter');
          res.body.tasks.length.should.equal(0);
          res.body.twitter.should.equal('@username');
          done();
        });
    });

  //get all Task samples
  it('Should return all tasks for a user', function(done) {

    // var id = response.body[0]._id,
    // update = { $pushAll : { tasks : [newTask, secondTask] }},
    // options = { new:true };

    chai.request(server)
      .get('/user/' + res.body[0]._id + '/tasks')
      .end(function(erroror, res) {
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
});
