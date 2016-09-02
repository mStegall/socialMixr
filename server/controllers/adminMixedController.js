var mixedDrinkModel = require('../models/mixedDrink');

module.exports = {
  approveDrink,
  rejectDrink,
  getReviewDrinks,
  getUnapprovedDrinks,
  flagDrink
};

function sendOk(res) {
  return function(){
    res.sendStatus(200);
  }
}

function sendJson(res) {
  return function (json) {
    res.json(json)
  }
}

function error(res) {
  return function (err) {
    console.error(err);
    res.sendStatus()
  }
}

// GETS
// ------------------------------------------------

// Returns list of drinks for review
function getReviewDrinks(req, res) {
  mixedDrinkModel.reviewDrinks()
    .then(sendJson(res))
    .catch(error(res))
}

//  Returns all Unapproved Drinks not up for review
function getUnapprovedDrinks(req, res) {
  mixedDrinkModel.unapprovedDrinks()
    .then(sendJson(res))
    .catch(error(res))
}

// Removes drink from review list
function rejectDrink(req, res) {
  mixedDrinkModel.rejectDrink(req.params.id)
    .then(sendOk())
    .catch(error(res))
}

// POSTS
// ------------------------------------------------

// Removes drink from review list and adds to public 
function approveDrink(req, res) {
  mixedDrinkModel.approveDrink(req.params.id)
    .then(sendOk())
    .catch(error(res))
}

// Flags a drink for review
function flagDrink(req, res) {
  mixedDrinkModel.flagDrink(req.params.id)
    .then(sendOk())
    .catch(error(res))
}