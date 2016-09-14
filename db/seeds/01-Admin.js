var bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
  var user = {
    'first_name': 'adminy',
    'last_name': 'testy-face',
    username: 'admin',
    'hashed_pass': bcrypt.hashSync('admin')
  }

  return Promise.all([
    knex('roles').then(function (rows) {
      if (rows.length === 0) {
        return knex('roles').insert({ role: 'admin' })
      }
    }),
    knex('users').then(function (rows) {
      if (rows.length === 0) {
        return knex('users').insert(user)
      }
    })
  ]).then(function () {
    return knex('users_roles').then(function (rows) {
      if (rows.length === 0) {
        return knex('users_roles').insert({
          'user_id': 1,
          'role_id': 1
        })
      }
    })
  })
};
