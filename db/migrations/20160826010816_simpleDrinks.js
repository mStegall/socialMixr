
exports.up = function (knex, Promise) {
    return Promise.all([

        knex.schema.createTable('categories', function (t) {
            t.increments();
            t.text('category');
            t.text('plural')
        }),

        knex.schema.createTable('types', function (t) {
            t.increments();
            t.text('type');
        }),

        knex.schema.createTable('subtypes', function (t) {
            t.increments();
            t.text('subtype');
        })
    ])
        .then(function () {
            return knex.schema.createTable('drinks', function (t) {
                t.increments();
                t.integer('user_id').references('users.id').notNullable();
                t.text('name').notNullable();

                t.integer('category_id').references('categories.id').notNullable();
                t.integer('type_id').references('types.id').notNullable();
                t.integer('subtype_id').references('subtypes.id');

                t.text('description');
                t.decimal('abv',8,3).notNullable();

                t.boolean('approved').defaultTo(false);
                t.boolean('review').defaultTo(false);

                t.integer('view_count').defaultTo(0);
            })
        })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('drinks')
        .then(function () {
            return Promise.all([
                knex.schema.dropTableIfExists('categories'),
                knex.schema.dropTableIfExists('types'),
                knex.schema.dropTableIfExists('subtypes'),
            ])
        })
};
