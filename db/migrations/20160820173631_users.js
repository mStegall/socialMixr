
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function (table) {
            table.increments('id');
            
            // Info
            table.text('first_name');
            table.text('last_name');
            
            // Login Info
            table.text('username').unique();
            table.text('hashed_pass').notNullable();
            
            // Contact Info
            table.text('email');
        }),

        knex.schema.createTable('users_roles', function (table) {
            table.integer('user_id').references('users.id');
            table.integer('role_id').references('roles.id');
            table.primary(['user_id', 'role_id']);
        }),

        knex.schema.createTable('roles', function (table) {
            table.increments('id');
            table.text('role').notNullable().index();
        }),
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users_roles'),
        knex.schema.dropTable('users'),        
        knex.schema.dropTable('roles')
    ]);
};
