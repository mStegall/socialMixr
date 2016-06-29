angular.module('app').factory('drinkData', function ($resource) {
    "ngInclude";
    return {
        getDrinks: function () {
            return $resource('/data/drinks').query();
        },
        getDrinksByCategory: function (category) {
            return $resource('/data/drinks/:category', {category: category}).query();
        },
        saveDrink: function (drink) {
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
        },
        updateDrink: function (drink) {
            return $resource('/data/updateDrink').save(drink);
        }
    };
});

