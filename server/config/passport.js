var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Promise = require('bluebird');
var bcrypt = require('bcryptjs');
var knex = require('./knex');

var User = require('../models/user');

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
                            getUser({ username }).then(function (user) {
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

    function getUser(filter) {
        var profileColumns = ['id', 'first_name as firstName', 'last_name as lastName', 'email', 'username']

        return Promise.all([
            knex('users').where(filter).select(profileColumns),
            knex('users').where(filter).select('roles.role')
                .innerJoin('users_roles', 'users.id', 'users_roles.user_id')
                .innerJoin('roles', 'users_roles.role_id', 'roles.id')
        ]).then(function ([users, roles]) {
            var user = users[0];

            roles = roles.map(el => el.role);

            user.roles = roles;

            return user;
        })
    }

    // Configure session persistence
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        getUser({ 'users.id': id }).then(function (user) {
            cb(null, user);
        })
    });


};