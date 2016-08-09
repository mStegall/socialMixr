var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto')

var User = require('../models/user');

module.exports = function () {
    // Set up Local Strategy
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({username: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect Username'});
                }
                if (!verifyPassword(user, password)) {
                    return done(null, false, {message: 'Incorrect Password'});
                }
                return done(null, user);
            });
        }
    ));

    var verifyPassword = function (user, password) {
        return User.hashPassword(user.salt, password) == user.password;
        // return user.password == password;
    };

    // Configure session persistence
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        User.findById(id, '-password -salt', function (err, user) {
            if (err) {
                return cb(err);
            }
            cb(null, user);
        });
    });


};