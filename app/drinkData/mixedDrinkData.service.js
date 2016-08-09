(function(){
    angular.module('app').factory('mixedDrinkData', function($resource) {
        "ngInclude";

        return {
            addMixedDrink: addMixedDrink
        }

        function addMixedDrink (drink) {
            return $resource('/data/addMixedDrink').save(drink);
        }
    })
})();