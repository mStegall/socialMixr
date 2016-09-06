var knex = require('../config/knex')
var Promise = require('bluebird')

module.exports = {
  baseDrink,
  approvedDrinks,
  reviewDrinks,
  unapprovedDrinks,
  drinkById,
  categories,
  types,
  subtypes,
  insertType,
  insertSubtype,
  addDrink,
  approveDrink,
  rejectDrink,
  flagDrink
}


// Selects
// ------------------------------

// Get list of drinks - INTERNAL
function baseDrink() {
  var columns = ['drinks.id as id', 'name', 'category', 'type', 'subtype', 'abv']

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

// Get categories
function categories() {
  return knex('categories').select('id', 'category')
}

// Get types
function types() {
  return knex('types').select('id', 'type')
}

// Get subtypes
function subtypes(){
  return knex('subtypes').select('id', 'subtype')
}



// Get type id - INTERNAL
function typeId(type) {
  return knex('types').select('id').whereRaw('LOWER("type") = LOWER(?)', [type]).then(rows => rows[0].id)
}

// Get subtype id - INTERNAL
function subtypeId(subtype) {
  return knex('subtypes').select('id').whereRaw('LOWER("subtype") = LOWER(?)', [subtype]).then(rows => rows[0].id)
}


// Inserts
// -------------------------------

// Attempts to insert type, promise returns object with either inserted ID or existing ID
function insertType(type) {
  var query = knex.raw('insert into public.types ("type") (select ? where not exists (select * from public.types where LOWER(type) = LOWER(?))) returning ??', [type, type, 'types.id'])
    .then(function (results) {
      if (results.rowCount == 0) {
        return typeId(type);
      } else {
        return results.rows[0].id;
      }
    })

  return query
}

// Attempts to insert subtype, promise returns object with either inserted ID or existing ID
function insertSubtype(subtype) {
  return knex.raw('insert into public.subtypes ("subtype") (select ? where not exists (select * from public.subtypes where LOWER(subtype) = LOWER(?))) returning ??', [subtype, subtype, 'subtypes.id']).then(function (results) {
    if (results.rowCount == 0) {
      return subtypeId(subtype);
    } else {
      return results.rows[0].id;
    }
  })
}

// Add simple drink to database
function addDrink(req, res) {
  var drink = {
    name: req.body.name,
    'category_id': req.body.categoryId,
    'type_id': req.body.typeId,
    abv: req.body.abv
  }

  console.log(req.body)

  function typeCheck() {
    if (req.body.type) {
      return typeInsert(req.body.type).then(function (id) {
        console.log(id)
        drink['type_id'] = id
      })
    }
  }

  function subtypeCheck() {
    console.log(req.body)
    if (req.body.subtypeId) {
      console.log(req.body.subtypeId)
      return drink['subtype_id'] = req.body.subtypeId
    } else if (req.body.subtype) {
      console.log(req.body.subtype)
      return subtypeInsert(req.body.subtype).then(function (id) {
        drink['subtype_id'] = id
      })
    }
  }

  Promise.all([typeCheck(), subtypeCheck()]).then(function () {
    knex('drinks').insert(drink).returning('id').then(function (id) {
      res.json(id)
    })
  })
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
  }).where({ id:id })
}