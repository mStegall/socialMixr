// Middleware
var auth = require('../middleware/auth');

// Controllers
var adminController = require('../controllers/adminController');
var adminMixedController = require('../controllers/adminMixedController');
var drinkData = require('../controllers/drinksController');
var mixedDrinkController = require('../controllers/mixedDrinkController');
var loginController = require('../controllers/loginController');
var profileController = require('../controllers/profileController');

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
    app.post('/data/addMixedDrink', mixedDrinkController.addMixedDrink);


    // Admin API
    // -------------------------------------------------
    // Users
    app.get('/data/users',auth.requiresRole('admin'), adminController.getUsers); 

    // Simple drinks
    app.get('/data/drinksUnapproved', auth.requiresRole('admin'), adminController.getUnapprovedDrinks);
    app.get('/data/drinksReview', auth.requiresRole('admin'), adminController.getReviewDrinks);
    
    app.post('/data/approveDrink', auth.requiresRole('admin'), adminController.approveDrink);
    app.post('/data/rejectDrink', auth.requiresRole('admin'), adminController.rejectDrink);
    app.post('/data/flagDrink', auth.requiresRole('admin'), adminController.flagDrink);

    // Mixed drinks
    app.get('/data/admin/mixedDrinks/unapproved', auth.requiresRole('admin'), adminMixedController.getUnapprovedDrinks);
    app.get('/data/admin/mixedDrinks/review', auth.requiresRole('admin'), adminMixedController.getReviewDrinks);

    app.post('/data/admin/mixedDrinks/approve', auth.requiresRole('admin'), adminMixedController.approveDrink);
    app.post('/data/admin/mixedDrink/reject', auth.requiresRole('admin'), adminMixedController.rejectDrink);
    app.post('/data/admin/mixedDrink/flag', auth.requiresRole('admin'), adminMixedController.flagDrink);

    // Profile API
    // -------------------------------------------------
    app.get('/data/profile/mixedDrinks', auth.requiresLogin, profileController.userMixedDrinks);

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