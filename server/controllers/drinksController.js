var Promise = require('bluebird')

var drinkModel = require('../models/drink')

module.exports = {
  drinks,
  drinksByCategory,
  addDrink,
  drink,
  addType,
  addSubtype
}

// Deliver all approved simple drinks in database
function drinks(req, res) {
  drinkModel.baseDrink().where({ approved: true })
    .then(function (rows) {
      res.json(rows)
    })
    .catch(function (err) {
      console.log(err)
      res.sendStatus(500)
    })
}

// Retrieve all approved drinks in in a category
function drinksByCategory(req, res) {
  drinkModel.baseDrink().where({
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

// Post handler for adding new type
function addType(req, res) {
  insertType(req.body.type).then(function (id) {
    res.json(id)
  })
}

// Post handler for adding new subtype
function addSubtype(req, res) {
  insertSubtype(req.body.subtype).then(function (id) {
    res.json(id)
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

  function typeCheck() {
    if (req.body.type) {
      return insertType(req.body.type).then(function (id) {
        drink['type_id'] = id
      })
    }
  }

  function subtypeCheck() {
    if (req.body.subtypeId) {
      console.log(req.body.subtypeId)
      return drink['subtype_id'] = req.body.subtypeId
    } else if (req.body.subtype) {
      console.log(req.body.subtype)
      return insertSubtype(req.body.subtype).then(function (id) {
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

// Deliver simple drink details
function drink(req, res) {
  drinkModel.drinkById(req.params.id).then(function (rows) {
    res.json(rows[0])
  })
}
