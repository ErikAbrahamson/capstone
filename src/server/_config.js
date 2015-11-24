var mongoURI = {
  development: 'mongodb://heroku_c416vwj1:r982k2ojtpikn4aujs846aueqr@ds057934.mongolab.com:57934/heroku_c416vwj1',
  test: 'mongodb://localhost/capstone-test',
  production: process.env.MONGOLAB_URI
};

var config = { MONGO_URI: mongoURI };

module.exports = config;
