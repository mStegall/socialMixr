var knexConfig = require('../../knexfile.js');

var node_env = process.env.NODE_ENV || 'development';

var knex = require('knex')(knexConfig[node_env]);

knex.migrate.latest();

knex.seed.run();

module.exports = knex;
