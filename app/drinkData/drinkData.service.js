angular.module('app').factory('drinkData', function ($resource) {
    return {
        getDrinks: function () {
            return $resource('/data/drinks').query();
        },
        saveDrink: function (drink) {
            drink.fav = false;
            return $resource('/data/addDrink').save(drink);
        },
        getDrink: function (drinkNum) {
            return $resource('/data/drink/:id', {id: drinkNum}).get();
        },
        deleteDrink: function (drinkId) {
            return $resource('/data/deleteDrink/').save({id: drinkId});
        },
        getMixedDrink: function (drinkId) {
            return $resource('/data/mixedDrink/:id', {id: drinkId}).get();
        }
    };
});

