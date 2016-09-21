var Promise = require('bluebird');

var drinkModel = require('../models/drink');
var categoryModel = require('../models/category');
var typeModel = require('../models/type');
var subtypeModel = require('../models/subtype');

module.exports = {
  drinks,
  drinksByCategory,
  drink,
  categories,
  types,
  subtypes,
  addDrink,
  addType,
  addSubtype
}

// GETS
// -----------------------------------------------------

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
  Promise.join(
    categoryModel.category(req.params.category),
    drinkModel.baseDrink().where({
      approved: true,
      category: req.params.category
    })
  )
    .then(function ([category, drinks]) {
      res.json({
        category,
        drinks
      })
    })
    .catch(function (err) {
      console.log(err)
      res.sendStatus(500)
    })
}

// Deliver simple drink details
function drink(req, res) {
  drinkModel.drinkById(req.params.id).then(function (rows) {
    res.json(rows[0])
  })
}

// Deliver categories
function categories(req, res) {
  categoryModel.categories().then(function (rows) {
    res.json(rows);
  }).catch(function (err) {
    console.error(err);
    res.sendStatus(500);
  })
}

// Deliver types
function types(req, res) {
  typeModel.types().then(function (rows) {
    res.json(rows);
  }).catch(function (err) {
    console.error(err);
    res.sendStatus(500);
  })
}

// Deliver subtypes
function subtypes(req, res) {
  subtypeModel.subtypes().then(function (rows) {
    res.json(rows);
  }).catch(function (err) {
    console.error(err);
    res.sendStatus(500);
  })
}



// POSTS
// -----------------------------------------------------

// Post handler for adding new type
function addType(req, res) {
  typeModel.insertType(req.body.type).then(function (id) {
    res.json(id)
  })
}

// Post handler for adding new subtype
function addSubtype(req, res) {
  subtypeModel.insertSubtype(req.body.subtype).then(function (id) {
    res.json(id)
  })
}

// Add simple drink to database
function addDrink(req, res) {
  var drink = {
    'user_id': req.user.id,
    name: req.body.name,
    'category_id': req.body.categoryId,
    'type_id': req.body.typeId,
    abv: req.body.abv,
    review: req.body.review
  }

  // Insert type if neccessary
  function typeCheck() {
    if (req.body.type) {

      return typeModel.insertType(req.body.type).then(function (id) {
        drink['type_id'] = id
      })

    }
  }

  // Add subtype ID or insert subtype if neccessary
  function subtypeCheck() {
    if (req.body.subtypeId) {

      return drink['subtype_id'] = req.body.subtypeId

    } else if (req.body.subtype) {

      return subtypeModel.insertSubtype(req.body.subtype).then(function (id) {
        drink['subtype_id'] = id
      })

    }
  }

  // Insert Drink
  Promise.join(typeCheck(), subtypeCheck())
    .then(function () {
      return drinkModel.addDrink(drink)
    })
    .then(ids => ids[0])
    .then(function(id){
      res.json(id);
    })
    .catch(function(err){
      console.error(err);
      res.sendStatus(500);
    })
}


