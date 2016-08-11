(function () {
    angular.module('app').factory('mixedDrinkData', function ($resource) {
        "ngInclude";

        return {
            addMixedDrink: addMixedDrink,
            getMixedDrinks: getMixedDrinks,
            getMixedDrink: getMixedDrink
        }

        function addMixedDrink(drink) {
            return $resource('/data/addMixedDrink').save(drink);
        }

        function getMixedDrinks() {
            return $resource('/data/mixedDrinks').query();
        }

        function getMixedDrink(id) {
            return $resource('/data/mixedDrink/:id', {id: id}).get();
        }
    })
})();