
exports.seed = function (knex, Promise) {
    return knex('drinks').then(function (rows) {
        if (rows.length === 0) {
            Promise.all([
                knex('categories').select('id', 'category'),
                knex('types').select('id', 'type'),
                knex('subtypes').select('id', 'subtype')
            ])
                .then(function ([cats, types, subs]) {
                    cats = cats.reduce((p, {id, category}) => p[category] = id, {})
                    console.log(cats)
                    

                    // var drinks = [
                    //     {
                    //         name: '',

                    //     }
                    // ]
                })
        }
    })
};
