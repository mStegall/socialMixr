var knex = require('../config/knex');
var Promise = require('bluebird');

module.exports = {
  baseDrink,
  approvedDrinks,
  reviewDrinks,
  unapprovedDrinks,
  drinkById,
  addDrink,
  approveDrink,
  rejectDrink,
  flagDrink
}


// Selects
// ------------------------------

// Get list of drinks - INTERNAL
function baseDrink() {
  var columns = ['drinks.id as id', 'name', 'category', 'categories.id as categoryId', 'type', 'subtype', 'abv']

  return knex.select(columns).from('drinks')
    .leftJoin('categories', 'drinks.category_id', 'categories.id')
    .leftJoin('types', 'drinks.type_id', 'types.id')
    .leftJoin('subtypes', 'drinks.subtype_id', 'subtypes.id')
}

// Get approved drinks
function approvedDrinks() {
  return baseDrink().where({ approved: true })
}

// Get review drinks
function reviewDrinks() {
  return baseDrink().where({ review: true })
}

// Get unapproved drinks not up for review
function unapprovedDrinks() {
  return baseDrink().where({
    approved: false,
    review: false
  })
}

// Get drink by id
function drinkById(id) {
  return baseDrink().where({ 'drinks.id': id })
}

// Inserts
// -------------------------------

// Add simple drink to database
function addDrink(drink) {
  return knex('drinks').insert(drink).returning('id')
}

// Updates
// -----------------------------

// Approve a drink and unlist it for review
function approveDrink(id) {
  return knex('drinks').update({
    approved: true,
    review: false
  }).where({ id })
}

// Reject a drink and unlist it for review
function rejectDrink(id) {
  return knex('drinks').update({
    approved: false,
    review: false
  }).where({ id })
}

// Unapprove drink and place for review
function flagDrink(id) {
  return knex('drinks').update({
    approved: false,
    review: true
  }).where({ id: id })
}