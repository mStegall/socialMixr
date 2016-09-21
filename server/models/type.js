var knex = require('../config/knex');
var Promise = require('bluebird');

module.exports = {
    types,
    typeId,
    insertType
}

// Selects
// ------------------------------

// Get types
function types() {
  return knex('types').select('id', 'type')
}

// Get type id
function typeId(type) {
  return knex('types').select('id').whereRaw('LOWER("type") = LOWER(?)', [type]).then(rows => rows[0].id)
}

// Inserts
// ------------------------------

// Attempts to insert type, promise returns object with either inserted ID or existing ID
function insertType(type) {
  return knex.raw('insert into public.types ("type") (select ? where not exists (select * from public.types where LOWER(type) = LOWER(?))) returning ??', [type, type, 'types.id'])
    .then(function (results) {
      if (results.rowCount == 0) {
        return typeId(type);
      } else {
        return results.rows[0].id;
      }
    })
}