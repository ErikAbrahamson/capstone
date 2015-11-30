process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app.js');
var Task = require('../../src/server/models/task.js');
var User = require('../../src/server/models/user.js');

var should = chai.should();
chai.use(chaiHttp);

describe('User Tasks', function() {

  Task.collection.drop();
  var date = new Date();
  date = date.setDate(15);

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

  it('Should return all tasks for a user', function(done) {
    var date = new Date();
    date = date.setDate(15);
    chai.request(server).get('/users/')
      .end(function(err, res) {
        chai.request(server)
          .get('/user/' + res.body[0]._id + '/tasks')
          .end(function(error, res) {
            res.should.have.status(200);
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('description');
            res.body[0].should.have.property('deadline');
            res.body[0].should.have.property('priority');
            res.body[0].should.have.property('complete');
            res.body[0].should.have.property('severity');
            res.body[0].should.have.property('punishment_type');
            res.body[0].punishment_type.should.have.property('donation');
            res.body[0].punishment_type.should.have.property('twitter_post');
            res.body[0].title.should.equal('Finish Tests');
            res.body[0].priority.should.equal(10);
            res.body[1].should.be.a('object');
            res.body[1].should.have.property('_id');
            res.body[1].should.have.property('title');
            res.body[1].should.have.property('description');
            res.body[1].should.have.property('deadline');
            res.body[1].should.have.property('priority');
            res.body[1].should.have.property('complete');
            res.body[1].should.have.property('severity');
            res.body[1].should.have.property('punishment_type');
            res.body[1].punishment_type.should.have.property('donation');
            res.body[1].punishment_type.should.have.property('twitter_post');
            res.body[1].title.should.equal('Seriously, finish tests');
            res.body[1].priority.should.equal(10);
            done();
          });
      });
  });

  it('Should return a single task from a user', function(done) {
    chai.request(server)
      .get('/users/').end(function(error, res) {
        chai.request(server)
          .get('/user/' + res.body[0]._id + '/task/' + res.body[0].tasks[0])
          .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('title');
            res.body.should.have.property('description');
            res.body.should.have.property('deadline');
            res.body.should.have.property('priority');
            res.body.should.have.property('complete');
            res.body.should.have.property('severity');
            res.body.should.have.property('punishment_type');
            res.body.punishment_type.should.have.property('donation');
            res.body.punishment_type.should.have.property('twitter_post');
            res.body.title.should.equal('Finish Tests');
            res.body.priority.should.equal(10);
            done();
          });
      });
  });

  it('Should post a new task into the user\'s task list', function(done) {
    var date = new Date();
    chai.request(server)
      .get('/users/').end(function(error, res) {
        chai.request(server)
          .post('/user/' + res.body[0]._id + '/task/')
          .send({
            'title': 'Finish Tests',
            'description': 'I\'d better finish these tests',
            'deadline': date.setDate(15),
            'priority': 10,
            'complete': false,
            'severity': 10,
            'punishment_type' : {
              'donation': true,
              'twitter_post': false
            }
          })
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.tasks.length.should.equal(3);
            done();
          });
      });
  });

  it('Should allow a user to edit tasks', function(done) {
    chai.request(server)
      .get('/users/').end(function(err, res) {
        chai.request(server)
          .put('/user/' + res.body[0]._id + '/task/' + res.body[0].tasks[0])
          .send({
            'description': 'Finished!',
            'complete': true,
           })
          .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.complete.should.equal('true');
            res.body.description.should.equal('Finished!');
            done();
          });
      });
  });

  it('Should allow a user to remove a task', function(done) {
    chai.request(server)
      .get('/users/').end(function(err, res) {
        chai.request(server)
          .delete('/user/' + res.body[0]._id + '/task/' + res.body[0].tasks[0])
          .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('title');
            res.body.should.have.property('description');
            res.body.should.have.property('deadline');
            res.body.should.have.property('priority');
            res.body.should.have.property('complete');
            res.body.should.have.property('severity');
            res.body.should.have.property('punishment_type');
            res.body.punishment_type.should.have.property('donation');
            res.body.punishment_type.should.have.property('twitter_post');
            res.body.title.should.equal('Finish Tests');
            res.body.priority.should.equal(10);
            done();
          });
      });
    });
});
