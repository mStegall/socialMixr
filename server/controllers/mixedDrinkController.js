var mixedDrinkModel = require('../models/mixedDrink');

var Promise = require('bluebird');

module.exports = {
  addMixedDrink,
  mixedDrink,
  mixedDrinks
};

// Add mixed drink to database
function addMixedDrink(req, res) {
  var drink = {
    'user_id': req.user.id,
    name: req.body.name,
    description: req.body.description,
    instructions: req.body.instructions,
    review: req.body.review
  }

  var drinkId

  mixedDrinkModel.addDrink(drink)
    .then(function ([id]) {
      drinkId = id
      var inserts = []

      if(req.body.customIngredients){
        inserts.push(mixedDrinkModel.addCustomIngredients(req.body.customIngredients, id))
      }

      if(req.body.drinkIngredients){
        inserts.push(mixedDrinkModel.addDrinkIngredients(req.body.drinkIngredients, id))
      }

      return Promise.all(inserts)
    })
    .then(function(){
      res.json({id: drinkId});
    })
    .catch(function(err){
      console.error(err);
      res.sendStatus(500);
    })
}

// Deliver all approved mixed drinks
function mixedDrinks(req, res) {
  mixedDrinkModel.approvedDrinks().then(function (rows) {
    res.json(rows);
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  })
}

// Deliver specific mixed drink
function mixedDrink(req, res) {
  mixedDrinkModel.drink(req.params.id).then(function (drink) {
    res.json(drink)
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  })
}