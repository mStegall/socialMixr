var knex = require('../config/knex')
var Promise = require('bluebird')

module.exports ={
    categories,
    category
}

// Get categories
function categories() {
  return knex('categories').select('id', 'category', 'plural')
}

// Get category
function category(category){
  return knex('categories').select('id', 'category', 'plural').where({category}).then(rows => rows[0])
}