var drinkModel = require('../models/drink');

module.exports = {
    drinks,
    drinksByCategory,
    addDrink,
    updateDrink,
    drink,
    deleteDrink
}

// Deliver all approved simple drinks in database
function drinks(req, res) {
    res.setHeader('Content-Type', 'application/json');
    drinkModel.find({ approved: true }, function (err, results) {
        if (err) {
            console.log(err);
        }
        res.send(results);
    });
};

// Retrieve all approved drinks in in a category
function drinksByCategory(req, res) {
    drinkModel.find({ approved: true, category: req.params.category }, function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(results);
    })
};

// Add simple drink to database
function addDrink(req, res) {
    var entry = new drinkModel(req.body);

    entry.save(function () {
        res.send("Success!");
    })
};

// Update existing simple drink
function updateDrink(req, res) {
    drinkModel.update({ _id: req.body._id }, { $set: req.body }, function () {
        res.send('done');
    });
};

// Deliver simple drink details
function drink(req, res) {
    res.setHeader('Content-Type', 'application/json');
    drinkModel.findById(req.params.id, function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.send(results);
    })
};

// Delete a drink from db
function deleteDrink(req, res) {
    if (req.isAuthenticated()) {
        drinkModel.findByIdAndRemove(req.body.id, function () {
            res.send("Success!");
        });
    } else {
        res.status(401).send();
    }
};