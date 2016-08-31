var mixedDrinkModel = require('../models/mixedDrink');

module.exports = {
    approveDrink,
    rejectDrink,
    getReviewDrinks,
    getUnapprovedDrinks,
    flagDrink
};

// Removes drink from review list
function rejectDrink(req, res) {
    mixedDrinkModel.update({ _id: req.body.id }, { review: false }, function () {
        res.sendStatus(200);
    })
}

// Removes drink from review list and adds to public 
function approveDrink(req, res) {
    mixedDrinkModel.update({ _id: req.body.id }, { approved: true, review: false }, function () {
        res.sendStatus(200);
    })
}

// Returns list of drinks for review
function getReviewDrinks(req, res) {
    mixedDrinkModel.find({ review: true }, function (err, results) {
        if (err) {
            console.log(err);
        }

        res.json(results);
    })
}

//  Returns all Unapproved Drinks not up for review
function getUnapprovedDrinks(req, res) {
    mixedDrinkModel.find({ approved: false, review: false }, function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(results);
    })
}

// Flags a drink for review
function flagDrink(req, res) {
    mixedDrinkModel.update({ _id: req.body.id }, { approved: false, review: true }, function () {
        res.sendStatus(200);
    })
}