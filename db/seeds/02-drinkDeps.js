
exports.seed = function (knex, Promise) {
    return Promise.all([
        knex('categories').then(function (rows) {
            if (rows.length === 0) {
                var categories = [
                    { category: 'beer' },
                    { category: 'wine' },
                    { category: 'spirit' }
                ]

                return knex('categories').insert(categories).then()
            }
        }),
        knex('types').then(function (rows) {
            if (rows.length === 0) {
                var types = [
                    { type: 'Vodka' },
                    { type: 'Irish Cream' },
                    { type: 'Pale Ale' }
                ]

                return knex('types').insert(types).then()
            }
        }),
        knex('subtypes').then(function (rows) {
            if (rows.length === 0) {
                var subtypes = [
                    { subtype: 'American Pale Ale' },
                    { subtype: 'American Amber Ale' },
                    { subtype: 'Salted Carmel' }
                ]

                return knex('subtypes').insert(subtypes).then()
            }
        })
    ])
};
