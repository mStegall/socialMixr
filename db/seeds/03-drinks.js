
exports.seed = function (knex, Promise) {
    return knex('drinks').then(function (rows) {
        if (rows.length === 0) {
            return Promise.all([
                knex('categories').select('id', 'category'),
                knex('types').select('id', 'type'),
                knex('subtypes').select('id', 'subtype')
            ])
            .then(function ([cats, types, subs]) {
                categoryMap = cats.reduce(function (prev, {id, category}) {
                    prev[category] = id;

                    return prev
                }, {})

                typeMap = types.reduce(function (prev, {id, type}) {
                    prev[type] = id

                    return prev
                }, {})

                subtypeMap = subs.reduce(function (prev, {id, subtype}) {
                    prev[subtype] = id

                    return prev
                }, {})

                var drinks = [
                    {
                        'user_id': 1,
                        name: 'Kahlua',
                        'category_id': categoryMap['Spirit'],
                        'type_id': typeMap['Liqueur'],
                        'subtype_id': subtypeMap['Coffee'],
                        abv: 0.2
                    },
                    {
                        'user_id': 1,
                        name: "Bailey's Irish Creme",
                        'category_id': categoryMap['Spirit'],
                        'type_id': typeMap['Liqueur'],
                        'subtype_id': subtypeMap['Cream'],
                        description: 'A Creme Liqueur made with Irish Dairy Cream and Irish Whiskey',
                        abv: 0.17,
                        approved: true
                    },
                    {
                        'user_id': 1,
                        name: 'Smirnoff',
                        'category_id': categoryMap['Spirit'],
                        'type_id': typeMap['Vodka'],
                        abv: 0.35,
                        review: true
                    },
                    {
                        'user_id': 1,
                        name: 'Sierra Nevada Pale Ale',
                        'category_id': categoryMap['Beer'],
                        'type_id': typeMap['Pale Ale'],
                        'subtype_id': subtypeMap['American Pale Ale'],
                        abv: 0.056
                    }
                ]

                return knex('drinks').insert(drinks)
            })
        }
    })
};
