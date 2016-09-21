(function () {
    angular.module('app').factory('drinkData', function ($resource) {
        "ngInclude";

        return {
            getDrinks: getDrinks,
            getTypes: getTypes,
            getSubtypes: getSubtypes,
            getCategories: getCategories,
            getDrinksByCategory: getDrinksByCategory,
            addDrink: addDrink,
            getDrink: getDrink,
            deleteDrink: deleteDrink,
            updateDrink: updateDrink
        };

        function getDrinks() {
            return $resource('/api/drinks').query();
        }

        function getTypes() {
            return $resource('/api/drinkTypes').query();
        }

        function getSubtypes() {
            return $resource('/api/drinkSubtypes').query();
        }

        function getCategories(){
            return $resource('/api/drinkCategories').query();
        }

        function getDrinksByCategory(category) {
            return $resource('/api/drinks/:category', { category: category }).get();
        }

        function addDrink(drink) {
            return $resource('/api/drink').save(drink);
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
