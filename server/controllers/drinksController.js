var knex = require('../config/knex')
var Promise = require('bluebird')

var drinkModel = require('../models/drink')

module.exports = {
  drinks,
  drinksByCategory,
  addDrink,
  updateDrink,
  drink,
deleteDrink}

function baseDrink () {
  var columns = ['drinks.id as id', 'name', 'category', 'type', 'subtype', 'abv']

  return knex('drinks').select(columns)
    .leftJoin('categories', 'drinks.category_id', 'categories.id')
    .leftJoin('types', 'drinks.type_id', 'types.id')
    .leftJoin('subtypes', 'drinks.subtype_id', 'subtypes.id')
}

// Deliver all approved simple drinks in database
function drinks (req, res) {
  baseDrink().where({ approved: true })
    .then(function (rows) {
      res.json(rows)
    })
    .catch(function (err) {
      console.log(err)
      res.sendStatus(500)
    })
}

// Retrieve all approved drinks in in a category
function drinksByCategory (req, res) {
  baseDrink().where({
    approved: true,
    category: req.params.category
  })
    .then(function (rows) {
      res.json(rows)
    })
    .catch(function (err) {
      console.log(err)
      res.sendStatus(500)
    })
}

function typeInsert (type) {
  return knex.raw('insert into public.types ("type") (select ? where not exists (select * from public.types where LOWER(type) = LOWER(?))) returning ??', [type, type, 'types.id']).then(function (results) {
    console.log(results)
  }) 
}

function subtypeInsert (subtype) {
  return knex('subtypes').insert({subtype}).then()
}

// Add simple drink to database
function addDrink (req, res) {
  var drink = {
    name: req.body.name,
    'category_id': req.body.categoryId,
    'type_id': req.body.typeId,
    abv: req.body.abv
  }

  var typeCheck = Promise.resolve(function () {
    if (req.body.type) {
      return 
    }
  })

  var subtypeCheck = Promise.resolve(function () {
    if (req.body.subtypeId) {
      return drink['subtype_id'] = req.body.subtypeId
    } else if (req.body.subtype) {
      return subtypeInsert(req.body.subtype).then(function (){

      })
    }
  })


  Promise.join(typeCheck, subtypeCheck)



  // var entry = new drinkModel(req.body)

// entry.save(function () {
//   res.send('Success!')
// })
}

// Update existing simple drink
function updateDrink (req, res) {
  drinkModel.update({ _id: req.body._id }, { $set: req.body }, function () {
    res.send('done')
  })
}

// Deliver simple drink details
function drink (req, res) {
  res.setHeader('Content-Type', 'application/json')
  drinkModel.findById(req.params.id, function (err, results) {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }

    res.send(results)
  })
}

// Delete a drink from db
function deleteDrink (req, res) {
  if (req.isAuthenticated()) {
    drinkModel.findByIdAndRemove(req.body.id, function () {
      res.send('Success!')
    })
  } else {
    res.status(401).send()
  }
}
