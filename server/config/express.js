var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var compression = require('compression');

var node_env = process.env.NODE_ENV || 'development';

module.exports = function (app, config) {
    // Logging
    if(node_env == 'development') {
        app.use(morgan('dev'));
    }    

    app.use(compression());

    // Middleware
    app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Serve Statics
    app.use(express.static('app'));
    
};