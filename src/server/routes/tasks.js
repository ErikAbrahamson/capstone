var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Task = require('../models/task.js'),
    mongoose = require('mongoose-q')(require('mongoose'), { spread: true });

router.post('/task', function(req, res, next) {
  new Task(req.body).saveQ(function(error, data) {
     if (error) {
      res.json({'message': error});
    } else {
      res.json(data);
    }
  });
});

router.get('/task', function(req, res, next) {
  task.findQ().then(function(result) {
      res.json(result);
    }).catch(function(error) {
      res.send(error);
    }).done();
});

router.get('/task/:id', function(req, res, next) {
  var query = {'_id': req.params.id};
  task.findByIdQ(query)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(error) {
      res.send(error);
    }).done();
});

router.put('/task/:id', function(req, res, next) {
  var query = { '_id': req.params.id }, options = { new: true };
  task.findOneAndUpdateQ(query, req.body, options)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(error) {
      res.send(error);
    }).done();
});

router.delete('/task/:id', function(req, res, next) {
  task.findByIdAndRemoveQ(req.params.id)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(error) {
      res.json(error);
    }).done();
});

module.exports = router;
