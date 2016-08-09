var mixedDrinkModel = require('../models/mixedDrink');

module.exports = {
    mixedDrink,
    mixedDrinks
};

// Add mixed drink to database
function addMixedDrink(req, res) {

};

// Deliver all approved mixed drinks
function mixedDrinks(req, res) {
    mixedDrinkModel.find({ approved: true }, function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(results);
    });
};

// Deliver specific mixed drink
function mixedDrink(req, res) {
    mixedDrinkModel.findById(req.params.id, function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(results);
    })
};