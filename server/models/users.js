var knex = require('../config/knex');
var Promise = require('bluebird');

module.exports = {
  getUser,
  userList
}

function getUser(filter) {
  var profileColumns = ['id', 'first_name as firstName', 'last_name as lastName', 'email', 'username']

  return Promise.all([
    knex('users').where(filter).select(profileColumns),
    knex('users').where(filter).select('roles.role')
      .innerJoin('users_roles', 'users.id', 'users_roles.user_id')
      .innerJoin('roles', 'users_roles.role_id', 'roles.id')
  ]).then(function ([users, roles]) {
    var user = users[0];

    roles = roles.map(el => el.role);

    user.roles = roles;

    return user;
  })
}

function userList() {
  var profileColumns = ['users.id', 'first_name as firstName', 'last_name as lastName', 'email', 'username',knex.raw("users.username, array_agg( roles.role ) as roles")]

  return knex('users').select(profileColumns)
    .leftJoin('users_roles','users.id', 'user_id')
    .leftJoin('roles', 'role_id', 'roles.id')
    .groupBy('users.id');
}