var knexConfig = require('../../knexfile.js');

var node_env = process.env.NODE_ENV || 'development';

var knex = require('knex')(knexConfig[node_env]);

console.log('Starting Migrations')
knex.migrate.latest()
.then(function () {
    console.log('Migrations Finished');
    console.log('Starting Seeds')
    knex.seed.run()
    .then( function () { 
        console.log('Seeding Finished')
    })
})



module.exports = knex;
