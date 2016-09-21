var express = require('express');
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;

// Init express app
var app = express();

var config = {
    rootPath : __dirname
};

// Express App
require('./server/config/express')(app, config);

// Passport Configuration
require('./server/config/passport')();

// Express Routing
require('./server/config/routes')(app, config);

// Start server
app.listen(port, function() {
  console.log("Starting the magic box!");
});
