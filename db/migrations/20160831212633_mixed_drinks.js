
exports.up = function (knex, Promise) {
  return knex.schema.createTable('mixed_drinks', function (t) {
    t.increments();
    t.text('name').notNullable();
    t.integer('user_id').references('users.id').notNullable();
    
    t.text('description');
    t.text('instructions');

    t.boolean('approved').defaultTo(false);
    t.boolean('review').defaultTo(false);

    t.integer('view_count').defaultTo(0);
  }).then(function () {
    return Promise.all([
      knex.schema.createTable('mixed_drinks_drink_ingredients', function (t) {
        t.increments();
        t.integer('mixed_drink_id').references('mixed_drinks.id').notNullable();
        t.integer('drink_id').references('drinks.id').notNullable();
        t.float('amount').notNullable();
      }),
      knex.schema.createTable('mixed_drinks_custom_ingredients', function (t) {
        t.increments();
        t.integer('mixed_drink_id').references('mixed_drinks.id').notNullable();
        t.text('name').notNullable();
        t.float('amount').notNullable();
      }),
    ])
  })


};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('mixed_drinks_custom_ingredients'),
    knex.schema.dropTableIfExists('mixed_drinks_drink_ingredients')
  ]).then(function () {
    return knex.schema.dropTableIfExists('mixed_drinks')
  })
};
