var drinkData = require('./drinksController');
var passport = require('passport');

module.exports = function (app, config) {
    // Drink API
    app.get('/data/drinks', drinkData.drinks);
    app.post('/data/addDrink', drinkData.addDrink);
    app.get('/data/drink/:id', drinkData.drink);
    app.post('/data/deleteDrink', drinkData.deleteDrink);
    app.get('/data/mixedDrink/:id', drinkData.mixedDrink);

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

    // Route all others to Angular app
    app.get('*', function (req, res) {
        res.sendFile(config.rootPath + '/app/index.html');
    });
};