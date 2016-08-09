var passport = require('passport');

var User = require('../models/user');

module.exports = {
    login,
    loggedIn,
    logout,
    signUp
}

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
            user.salt = undefined;
            user.password = undefined;
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
    var salt = User.createSalt();
    var user = {
        username: req.body.username,
        salt: salt,
        password: User.hashPassword(salt, req.body.password),
        email: req.body.email
    };

    User.create(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send('success');
        }
    })
}