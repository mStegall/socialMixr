// Middleware
var auth = require('../middleware/auth');

// Controllers
var adminController = require('../controllers/adminController');
var drinkData = require('../controllers/drinksController');
var mixedDrinkController = require('../controllers/mixedDrinkController');
var loginController = require('../controllers/loginController');

module.exports = function (app, config) {
    
    // Drink API
    // -------------------------------------------------    
    // Get simple drinks
    app.get('/data/drinks', drinkData.drinks);
    app.get('/data/drinks/:category', drinkData.drinksByCategory);
    app.get('/data/drink/:id', drinkData.drink);

    // Add/Modify simple drinks
    app.post('/data/addDrink', drinkData.addDrink);
    app.post('/data/deleteDrink', drinkData.deleteDrink);
    app.post('/data/updateDrink', drinkData.updateDrink);

    // Mixed Drink API
    // -------------------------------------------------
    // Get mixed drinks
    app.get('/data/mixedDrinks', mixedDrinkController.mixedDrinks);
    app.get('/data/mixedDrink/:id', mixedDrinkController.mixedDrink);

    // Add/Modify mixed drinks


    // Admin API
    // -------------------------------------------------
    app.get('/data/users',auth.requiresRole('admin'), adminController.getUsers);
    app.get('/data/drinksReview', auth.requiresRole('admin'), adminController.getReviewDrinks);
    app.post('/data/approveDrink', auth.requiresRole('admin'), adminController.approveDrink);
    app.post('/data/rejectDrink', auth.requiresRole('admin'), adminController.rejectDrink);
    app.get('/data/drinksUnapproved', auth.requiresRole('admin'), adminController.getUnapprovedDrinks);
    app.post('/data/flagDrink', auth.requiresRole('admin'), adminController.flagDrink);

    // Login Controls
    // -------------------------------------------------
    app.post('/login', loginController.login);
    app.get('/loggedin', loginController.loggedIn);
    app.post('/logout', loginController.logout);
    app.post('/signUp', loginController.signUp);

    // Route all others to Angular app
    // -------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(config.rootPath + '/app/index.html');
    });
};