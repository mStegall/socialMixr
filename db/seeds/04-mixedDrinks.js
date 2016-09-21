
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('mixed_drinks')
    .then(function (rows) {
      if (rows.length === 0) {
        return knex('mixed_drinks').insert({
          'user_id': 1,
          name: 'White Russian',
          instructions: 'Mix and serve over ice in an old fashion glass, milk may be substituted for cream.',
          description: 'The drinks name comes from the use of Vodka, not because it is Russian in origin.',
          approved: true
        }).then(function () {
          var drinkIngredients = [
            {
              mixed_drink_id: 1,
              drink_id: 3,
              amount: 2.5
            },
            {
              mixed_drink_id: 1,
              drink_id: 1,
              amount: 1
            }
          ]

          var customIngredients = [
            {
              mixed_drink_id: 1,
              name: 'Cream',
              amount: 1.5
            }
          ]

          return Promise.join(
            knex('mixed_drinks_drink_ingredients').insert(drinkIngredients),
            knex('mixed_drinks_custom_ingredients').insert(customIngredients)
          )
        })
      }
    });
};
