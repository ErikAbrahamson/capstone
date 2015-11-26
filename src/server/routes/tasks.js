var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    passport = require('passport'),
    Task = require('../models/task.js'),
    mongoose = require('mongoose-q')(require('mongoose'), { spread: true });

router.get('/user/:id/tasks', function(req, res, next){
 User.findById(req.params.id)
  .populate('tasks')
  .exec(function(error, user) {
    console.log(user);
    if (error) res.json(error);
    else res.json(user.tasks);
  });
});

router.post('/user/:id/task', function(req, res, next) {
    var newTask = new Task(req.body);
    newTask.saveQ();
    var update = { $push : {tasks : newTask }}, options = { new: true },
            id = req.params.id;

    User.findByIdAndUpdateQ(id, update, options)
      .then(function(result) { res.json(result); })
      .catch(function(error) { res.send(error); });
});

router.put('/user/task/:id', function(req, res, next) {
  var query = { '_id': req.params.id }, options = { new: true };
  Task.findOneAndUpdateQ(query, req.body, options)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(error) {
      res.send(error);
    }).done();
});

router.delete('/user/task/:id', function(req, res, next) {
  Task.findByIdAndRemoveQ(req.params.id)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(error) {
      res.json(error);
    }).done();
});
module.exports = router;
