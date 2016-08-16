(function () {
    angular.module('app').factory('drinkData', function ($resource) {
        "ngInclude";

        return {
            getDrinks: getDrinks,
            getDrinksByCategory: getDrinksByCategory,
            addDrink: addDrink,
            getDrink: getDrink,
            deleteDrink: deleteDrink,
            updateDrink: updateDrink
        };

        function getDrinks() {
            return $resource('/data/drinks').query();
        }

        function getDrinksByCategory(category) {
            return $resource('/data/drinks/:category', { category: category }).query();
        }

        function addDrink(drink) {
            return $resource('/data/addDrink').save(drink);
        }

        function getDrink(id) {
            return $resource('/data/drink/:id', { id: id }).get();
        }

        function deleteDrink(drinkId) {
            return $resource('/data/deleteDrink/').save({ id: drinkId });
        }

        function updateDrink(drink) {
            return $resource('/data/updateDrink').save(drink);
        }
    });
})()
