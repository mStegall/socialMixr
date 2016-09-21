var knex = require('../config/knex')
var Promise = require('bluebird')

module.exports = {
    subtypes,
    subtypeId,
    insertSubtype
}

// Selects
// ------------------------------

// Get subtypes
function subtypes() {
  return knex('subtypes').select('id', 'subtype')
}

// Get subtype id
function subtypeId(subtype) {
  return knex('subtypes').select('id').whereRaw('LOWER("subtype") = LOWER(?)', [subtype]).then(rows => rows[0].id)
}

// Inserts
// ------------------------------

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