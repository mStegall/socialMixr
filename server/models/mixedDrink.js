// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var mixedDrinkSchema = new Schema({
//     name: String,
//     creator: {type: String, ref: 'user'},
//     description: String,
//     instructions: String,
//     dbIngredients: [{
//         drink: {type: String, ref: 'drink'},
//         amount: Number
//     }],
//     userIngredients: [{
//         drink: String,
//         amount: Number
//     }],
//     reviews: [{
//         userId: {type: String, ref: 'users'},
//         rating: Number,
//         text: String
//     }],    
//     approved: {type: Boolean, default: false},
//     review: {type: Boolean, default: false}
// });

// var autoPop = function (next) {
//     this.populate('dbIngredients.drink');
//     this.populate({
//         path: 'creator',
//         select: 'firstName lastName'
//     })
//     // this.populate('complexComponents.id');
//     next();
// };

// mixedDrinkSchema.pre('findOne', autoPop);
// mixedDrinkSchema.pre('find', autoPop);

// module.exports = mongoose.model('mixedDrink', mixedDrinkSchema, 'mixedDrinks');

var knex = require('../config/knex');

module.exports = {
  drink,
  approvedDrinks,
  userDrinks,
  reviewDrinks,
  unapprovedDrinks,
  addDrink,
  addCustomIngredients,
  addDrinkIngredients,
  approveDrink,
  rejectDrink,
  flagDrink
}

function baseDrink() {
  var columns = ['mixed_drinks.id as id', 'name', 'users.first_name as firstName', 'last_name as lastName', 'description', 'instructions']

  return knex('mixed_drinks').select(columns)
    .leftJoin('users', 'mixed_drinks.user_id', 'users.id')
}

// Select
// ---------------------------------------

function drink(id) {
  return Promise.all([
    baseDrink().where({ 'mixed_drinks.id': id }),
    knex('mixed_drinks_custom_ingredients').select(['name', 'amount']).where('mixed_drink_id', id),
    knex('mixed_drinks_drink_ingredients').select(['drinks.id', 'drinks.name', 'amount']).where('mixed_drink_id', id)
      .leftJoin('drinks', 'drink_id', 'drinks.id')
  ]).then(function ([[drink], customIngredients, drinkIngredients]) {

    drink.customIngredients = customIngredients;
    drink.drinkIngredients = drinkIngredients;

    return drink;
  })
}

function approvedDrinks() {
  return baseDrink().where({
    approved: true
  })
}

function userDrinks(userId) {
  return baseDrink().where({'user_id': userId})
}

function reviewDrinks() {
  return baseDrink().where({
    review: true
  })
}

function unapprovedDrinks() {
  return baseDrink().where({
    approved: false,
    review: false
  })
}

// Insert
// -----------------------------------------

function addDrink(drink) {
  return knex('mixed_drinks').insert(drink).returning('id')
}

function addCustomIngredients(ingredients, mixedDrinkId) {
  ingredients = ingredients.map(function(ingredient){
    ingredient['mixed_drink_id'] = mixedDrinkId;

    return ingredient;
  })

  console.log('custom')
  console.log(ingredients);

  return knex('mixed_drinks_custom_ingredients').insert(ingredients).returning('id')
}

function addDrinkIngredients(ingredients, mixedDrinkId) {
  ingredients = ingredients.map(function(ingredient){
    ingredient['mixed_drink_id'] = mixedDrinkId;
    ingredient['drink_id'] = ingredient.drinkId;
    delete ingredient.drinkId;

    return ingredient; 
  })

  console.log('drinks')
  console.log(ingredients);

  return knex('mixed_drinks_drink_ingredients').insert(ingredients).returning('id')
}

// Update
// -----------------------------------------

function approveDrink(id) {
  return knex('mixed_drinks').update({
    approved: true,
    review: false
  }).where({ id })
}

function rejectDrink(id) {
  return knex('mixed_drinks').update({
    approved: false,
    review: false
  }).where({ id })
}

function flagDrink(id) {
  return knex('mixed_drinks').update({
    approved: false,
    review: true
  }).where({ id })

}