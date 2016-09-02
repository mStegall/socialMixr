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
            return $resource('/api/drinks').query();
        }

        function getDrinksByCategory(category) {
            return $resource('/api/drinks/:category', { category: category }).query();
        }

        function addDrink(drink) {
            return $resource('/api/addDrink').save(drink);
        }

        function getDrink(id) {
            return $resource('/api/drink/:id', { id: id }).get();
        }

        function deleteDrink(drinkId) {
            return $resource('/api/deleteDrink/').save({ id: drinkId });
        }

        function updateDrink(drink) {
            return $resource('/api/updateDrink').save(drink);
        }
    });
})()
