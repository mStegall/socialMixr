(function () {
    angular.module('app').component('drinkList',{
        templateUrl:'/viewDrinks/drinkList.html',
        controller: drinkListCtrl
    }) 
    
    
    
    
    function drinkListCtrl(drinkData) {
        "ngInclude";

        var vm = this;

        vm.filterCollapsed = true;

        vm.drinks = drinkData.getDrinks();

        vm.drinks.$promise.then(function () {
            var types = vm.drinks.map(function (drink) {
                return drink.type;
            });

            vm.types = _.uniq(types);
        });
    }
})()