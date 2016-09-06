// Middleware
var auth = require('../middleware/auth');

// Controllers
var adminController = require('../controllers/adminController');
var adminMixedController = require('../controllers/adminMixedController');
var drinkController = require('../controllers/drinksController');
var mixedDrinkController = require('../controllers/mixedDrinkController');
var loginController = require('../controllers/loginController');
var profileController = require('../controllers/profileController');

module.exports = function (app, config) {

    // Drink API
    // -------------------------------------------------    
    // Get simple drinks
    app.get('/api/drinks', drinkController.drinks);
    
    app.get('/api/drinks/:category', drinkController.drinksByCategory);
    app.get('/api/drink/:id', drinkController.drink);
    app.post('/api/drink', drinkController.addDrink)
    app.post('/api/drink/type', drinkController.addType);
    app.post('/api/drink/subtype', drinkController.addSubtype);

    app.get('/api/drinkCategories', drinkController.categories);
    app.get('/api/drinkTypes', drinkController.types)
    app.get('/api/drinkSubtypes', drinkController.subtypes)

    // Add/Modify simple drinks
    app.post('/api/addDrink', drinkController.addDrink);
    // app.post('/api/deleteDrink', drinkController.deleteDrink);
    // app.post('/api/updateDrink', drinkController.updateDrink);

    // Mixed Drink API
    // -------------------------------------------------
    // Get mixed drinks
    app.get('/api/mixedDrinks', mixedDrinkController.mixedDrinks);
    app.get('/api/mixedDrink/:id', mixedDrinkController.mixedDrink);

    // // Add/Modify mixed drinks
    app.post('/api/mixedDrink', auth.requiresLogin,  mixedDrinkController.addMixedDrink);


    // Admin API
    // -------------------------------------------------
    // Users
    app.get('/api/admin/users', auth.requiresRole('admin'), adminController.getUsers);

    // Simple drinks
    app.get('/api/admin/drinks/unapproved', auth.requiresRole('admin'), adminController.getUnapprovedDrinks);
    app.get('/api/admin/drinks/review', auth.requiresRole('admin'), adminController.getReviewDrinks);

    app.post('/api/admin/drink/:id/approve', auth.requiresRole('admin'), adminController.approveDrink);
    app.post('/api/admin/drink/:id/reject', auth.requiresRole('admin'), adminController.rejectDrink);
    app.post('/api/admin/drink/:id/flag', auth.requiresRole('admin'), adminController.flagDrink);

    // // Mixed drinks
    app.get('/api/admin/mixedDrinks/unapproved', auth.requiresRole('admin'), adminMixedController.getUnapprovedDrinks);
    app.get('/api/admin/mixedDrinks/review', auth.requiresRole('admin'), adminMixedController.getReviewDrinks);

    app.post('/api/admin/mixedDrink/:id/approve', auth.requiresRole('admin'), adminMixedController.approveDrink);
    app.post('/api/admin/mixedDrink/:id/reject', auth.requiresRole('admin'), adminMixedController.rejectDrink);
    app.post('/api/admin/mixedDrink/:id/flag', auth.requiresRole('admin'), adminMixedController.flagDrink);

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