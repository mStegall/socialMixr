var drinkData = require('./drinksController');
var passport = require('passport');
var User = require('./mongooseModels').user;
var auth = require('./auth');
var drink = require('./mongooseModels').drink;

module.exports = function (app, config) {
    // Drink API
    app.get('/data/drinks', drinkData.drinks);
    app.get('/data/drinks/:category', drinkData.drinksByCategory);
    app.post('/data/addDrink', drinkData.addDrink);
    app.get('/data/drink/:id', drinkData.drink);
    app.post('/data/deleteDrink', drinkData.deleteDrink);
    app.get('/data/mixedDrink/:id', drinkData.mixedDrink);
    app.post('/data/updateDrink', drinkData.updateDrink);

    // Admin API
    app.get('/data/users',auth.requiresRole('admin'), function (req, res) {
        User.find(function (err, results) {
            res.json(results);
        })
    });

    app.get('/data/drinksUnapproved', auth.requiresRole('admin'), function (req, res) {
        drink.find({approved: {$ne: true}}, function (err, results) {
            console.log(results);
            res.json(results);

        })
    });

    app.post('/data/approveDrink/:id', auth.requiresRole('admin'), function (req, res) {
       drink.update({_id: req.params.id}, {approved: true}, function () {
           res.send('done');
       })
    });

    // Login Controls
    app.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                res.status(401).json({reason: info.message});
                return next(err);
            }
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                return res.send(user);
            })
        })(req,res,next);
        // res.send(req.user);
    });
    app.get('/loggedin', function (req, res) {
        if (req.isAuthenticated()) {
            res.status(200).send(req.user);
        } else {
            res.status(401).send();
        }
    });
    app.post('/logout', function (req, res) {
        req.logOut();
        res.send("logged out");
    });

    // Sign up new user
    app.post('/signUp', function (req, res) {
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
    });

    // Route all others to Angular app
    app.get('*', function (req, res) {
        res.sendFile(config.rootPath + '/app/index.html');
    });
};