var models = require('./mongooseModels');
var drink = models.drink;
var user = models.user;

module.exports = {
    approveDrink: approveDrink,
    rejectDrink: rejectDrink,
    getUsers: getUsers,
    getReviewDrinks: getReviewDrinks,
    getUnapprovedDrinks: getUnapprovedDrinks
};


function rejectDrink(req, res) {
    drink.update({_id: req.body.id}, {review: false}, function () {
        res.sendStatus(200);
    })
}

function approveDrink(req, res) {
    drink.update({_id: req.body.id}, {approved: true, review: false}, function () {
        res.sendStatus(200);
    })
}

function getUsers(req, res) {
    user.find(function (err, results) {
        if (err) {
            console.log(err)
        }
        res.json(results)
    })
}

function getReviewDrinks(req, res) {
    drink.find({review: true}, function (err, results) {
        res.json(results);

    })
}

function getUnapprovedDrinks(req, res) {
    drink.find({approved: false, review: false}, function (err, results) {
        res.json(results);
    })
}