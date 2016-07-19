var drinkData = require('./drinksController');
var passport = require('passport');
var models = require('./mongooseModels')
var auth = require('./auth');
var adminController = require('./adminController');
var User = models.user;
var drink = models.drink;

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
    app.get('/data/users',auth.requiresRole('admin'), adminController.getUsers);
    app.get('/data/drinksReview', auth.requiresRole('admin'), adminController.getReviewDrinks);
    app.post('/data/approveDrink', auth.requiresRole('admin'), adminController.approveDrink);
    app.post('/data/rejectDrink', auth.requiresRole('admin'), adminController.rejectDrink);
    app.get('/data/drinksUnapproved', auth.requiresRole('admin'), adminController.getUnapprovedDrinks);
    app.post('/data/flagDrink', auth.requiresRole('admin'), adminController.flagDrink);

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
                user.salt = undefined;
                user.password = undefined;
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
        res.sendStatus(200);
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