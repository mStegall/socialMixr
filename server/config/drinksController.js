var models = require('./mongooseModels.js');
var drink = models.drink;
var mixedDrink = models.mixedDrink;



// Deliver all simple drinks in database
module.exports.drinks = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    drink.find({approved: true}, function (err, results) {
        if (err) {
            console.log(err);
        }
        res.send(results);
    });
};

// Retrieve all drinks in in a category
module.exports.drinksByCategory = function (req, res) {
    drink.find({approved: true, category: req.params.category}, function (err, results) {
        if (err) {
            console.log(err);
        }
        res.json(results);
    })
};

// Add simple drink to database
module.exports.addDrink = function (req, res) {
    var entry = new drink(req.body);

    entry.save(function () {
        res.send("Success!");
    })
};

// Update existing simple drink
module.exports.updateDrink = function (req, res) {
    console.log(req.body);
    drink.update({_id: req.body._id}, {$set: req.body}, function () {
        res.send('done');
    });
};

// Deliver simple drink details
module.exports.drink = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    drink.findById(req.params.id, function (err, results) {
        res.send(results);
    })
};

module.exports.deleteDrink = function (req, res) {
    if (req.isAuthenticated()) {
        drink.findByIdAndRemove(req.body.id, function () {
            res.send("Success!");
        });
    } else {
        res.status(401).send();
    }
};

module.exports.mixedDrink = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    mixedDrink.findOne({_id: req.params.id}, function (err, results) {
        res.send(results);
    });
};