var express = require('express');
var mongoose = require('mongoose');
var User = require('./server/config/mongooseModels').user;
var drink = require('./server/config/mongooseModels').drink;
var mysql = require('mysql');

var db = mysql.createPool({
    connectionLimit: 10,
    host: 'q3vtafztappqbpzn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'lxjqj4t240cxhp7m',
    password: 'i4snadyoevl8ua9w',
    database: 'x8k6dw8a2ee8w3j1'
});

db.getConnection(function (err, connection) {
   connection.query('SELECT * FROM simpleDrinks', function (err, results) {
       console.log(results);
       connection.release();
   });
});

var port = process.env.PORT || 3000;

// Init express app
var app = express();

var config = {
    rootPath : __dirname
};

// Database Connection
// mongoose.connect('mongodb://mstegall:9t5eV#zFn%bBYoj6%*hL@ds021671.mlab.com:21671/socialmixr')
var db = mongoose.connection;
db.open('mongodb://mstegall:9t5eV#zFn%bBYoj6%*hL@ds021671.mlab.com:21671/socialmixr');
db.once('open', function () {
    console.log("Connected to Database");
    User.find({}).exec(function (err, results) {
        if (results.length == 1) {
            var salt = User.createSalt();
            User.create({username: "Temp123", salt: salt, password: User.hashPassword(salt, "13853211")});
        }
    })
});


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
