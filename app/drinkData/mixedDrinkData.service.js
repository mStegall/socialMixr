(function () {
    angular.module('app').factory('mixedDrinkData', function ($resource) {
        "ngInclude";

        return {
            addMixedDrink: addMixedDrink,
            getMixedDrinks: getMixedDrinks,
            getMixedDrink: getMixedDrink
        }

        function addMixedDrink(drink) {
            return $resource('/api/addMixedDrink').save(drink);
        }

        function getMixedDrinks() {
            return $resource('/api/mixedDrinks').query();
        }

        function getMixedDrink(id) {
            return $resource('/api/mixedDrink/:id', {id: id}).get();
        }
    })
})();