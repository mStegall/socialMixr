var userModel = require('../models/users');
var drinkModel = require('../models/drink');

module.exports = {
    approveDrink,
    rejectDrink,
    getUsers,
    getReviewDrinks,
    getUnapprovedDrinks,
    flagDrink
};

// Returns all users
function getUsers(req, res) {
    userModel.userList().then(function(rows){
        res.json(rows)
    })
}

// Removes drink from review list
function rejectDrink(req, res) {
    drinkModel.rejectDrink(req.params.id).then(function(){
        res.sendStatus(200);
    }).catch(function(err){
        console.error(err);
        res.sendStatus(500);
    })
}

// Removes drink from review list and adds to public 
function approveDrink(req, res) {
    drinkModel.approveDrink(req.params.id).then(function(){
        res.sendStatus(200);
    })
}

// Returns list of drinks for review
function getReviewDrinks(req, res) {
    drinkModel.reviewDrinks().then(function(rows){
        res.json(rows);
    })
}

//  Returns all Unapproved Drinks not up for review
function getUnapprovedDrinks(req, res) {
    drinkModel.unapprovedDrinks().then(function(rows){
        res.json(rows);
    })
}

// Flags a drink for review
function flagDrink(req, res) {
    drinkModel.flagDrink(req.params.id).then(function(){
        res.sendStatus(200)
    })

}
