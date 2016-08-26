
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').where({role: 'admin'})
    .then(function (rows) {
      if (rows.length === 0) {
        return knex('roles').insert({role: 'admin'})
      }
    });
};
