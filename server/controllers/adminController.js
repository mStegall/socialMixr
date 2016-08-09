var drink = require('../models/drink');
var user = require('../models/user');
var mixedDrinkModel = require('../models/mixedDrink');

module.exports = {
    approveDrink,
    rejectDrink,
    getUsers,
    getReviewDrinks,
    getUnapprovedDrinks,
    flagDrink,
    getReviewMixedDrinks,
    getUnapprovedMixedDrinks
};

// Removes drink from review list
function rejectDrink(req, res) {
    drink.update({ _id: req.body.id }, { review: false }, function () {
        res.sendStatus(200);
    })
}

// Removes drink from review list and adds to public 
function approveDrink(req, res) {
    drink.update({ _id: req.body.id }, { approved: true, review: false }, function () {
        res.sendStatus(200);
    })
}

// Returns all users
function getUsers(req, res) {
    user.find(function (err, results) {
        if (err) {
            console.log(err);
        }

        res.json(results);
    })
}

// Returns list of drinks for review
function getReviewDrinks(req, res) {
    drink.find({ review: true }, function (err, results) {
        if (err) {
            console.log(err);
        }

        res.json(results);
    })
}

//  Returns all Unapproved Drinks not up for review
function getUnapprovedDrinks(req, res) {
    drink.find({ approved: false, review: false }, function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(results);
    })
}

// Flags a drink for review
function flagDrink(req, res) {
    drink.update({ _id: req.body.id }, { approved: false, review: true }, function () {
        res.sendStatus(200);
    })
}

// Return mixed drinks for review
function getReviewMixedDrinks (req, res) {
    mixedDrinkModel.find({approved: false, review: true}, function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(results);
    })
}

// Return all unapproved mixed drinks not up for review
function getUnapprovedMixedDrinks(req, res) {
    mixedDrinkModel.find({approved: false, review: false}, function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(results);
    })
}