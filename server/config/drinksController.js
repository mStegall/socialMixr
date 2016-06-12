var models = require('./mongooseModels.js');
var drink = models.drink;
var mixedDrink = models.mixedDrink;



// Deliver all simple drinks in database
module.exports.drinks = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    drink.find(function (err, results) {
        if (err) {
            console.log(err);
        }
        res.send(results);
    });
};

// Add simple drink to database
module.exports.addDrink = function (req, res) {
    var entry = new drink({
        name: req.body.name,
        type: req.body.type,
        manufacturer: req.body.manufacturer,
        countryOfOrigin: req.body.countryOfOrigin,
        abv: req.body.abv
    });

    entry.save(function () {
        res.send("Success!");
    })
};

// Deliver simple drink details
module.exports.drink = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    drink.findById(req.params.id, function (err, results) {
        console.log(results);
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