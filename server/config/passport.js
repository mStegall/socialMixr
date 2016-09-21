var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Promise = require('bluebird');
var bcrypt = require('bcryptjs');
var knex = require('./knex');

var userModel = require('../models/users');

module.exports = function () {
    // Set up Local Strategy
    passport.use(new LocalStrategy(
        function (username, password, done) {
            knex('users').where('username', username).select('hashed_pass as hashedPass')
                .then(function (rows) {
                    if (rows.length != 1) {
                        return done(null, false, { message: 'Incorrect Username' })
                    }

                    bcrypt.compare(password, rows[0].hashedPass, function (err, result) {
                        if (err) {
                            return done(err);
                        }

                        if (result) {
                            userModel.getUser({ username }).then(function (user) {
                                done(null, user);
                            })
                        } else {
                            return done(null, false, { message: 'Incorrect Password' });
                        }
                    })
                })
                .catch(function (err) {
                    return done(err);
                })
        }
    ));

    // Configure session persistence
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        userModel.getUser({ 'users.id': id }).then(function (user) {
            cb(null, user);
        })
    });


};