var passport = require('passport');
var bcrypt = require('bcryptjs');

var knex = require('../config/knex');

module.exports = {
    login,
    loggedIn,
    logout,
    signUp
};

function login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            res.status(401).json({ reason: info.message });
            return next(err);
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.send(user);
        })
    })(req, res, next);
}

function loggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send();
    }
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function signUp(req, res) {
    var user = {
        username: req.body.username,
        email: req.body.email
    };

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        user['hashed_pass'] = hash;

        knex('users').insert(user)
            .then(function() {
                res.sendStatus(201);
            })
            .catch(function(){
                res.sendStatus(500);
            })
    })
}