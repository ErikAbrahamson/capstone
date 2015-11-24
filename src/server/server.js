var debug = require('debug')('passport-mongo'),
    app = require('./app');

process.env.NODE_ENV = 'development';
app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
