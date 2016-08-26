var mixedDrinkModel = require('../models/mixedDrink');
var drinkModel = require('../models/drink');

module.exports = {
    userMixedDrinks
};

function userMixedDrinks(req, res) {
    mixedDrinkModel.find({creator: req.user.id}, function(err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(results);
    })
}