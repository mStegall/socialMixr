var mixedDrinkModel = require('../models/mixedDrink');


module.exports = {
  userMixedDrinks
};

function userMixedDrinks(req, res) {
  mixedDrinkModel.userDrinks(req.user.id)
    .then(function (rows) {
      res.json(rows);
    })
    .catch(function (err) {
      console.error(err);
      res.sendStatus(500);
    })
}