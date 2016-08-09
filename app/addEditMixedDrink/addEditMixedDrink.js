angular.module('app').component('addEditMixedDrink', {
    templateUrl: '/addEditMixedDrink/addEditMixedDrink.html',
    controller: addEditMixedDrinkCtrl
})

function addEditMixedDrinkCtrl($routeParams, drinkData, userInfo, login, $uibModal, $scope) {
    "ngInclude";
    var vm = this;

    // Initialize with two ingredients 
    vm.ingredients = [{}, {}]

    // Set up alerts
    vm.alerts = []
    vm.closeAlert = function (index) {
        vm.alerts.splice(index, 1);
    }

    // Get user state and set alerts
    function updateUser() {
        vm.user = userInfo.getUser();
        // debugger;
        if (!vm.user) {
            vm.alerts = [{msg: "You won't be able to save while not logged in!"}]
        } else {
            vm.alerts = []
        }
    }

    vm.$onInit = function () {
        // Load all drinks
        vm.drinks = drinkData.getDrinks();
        
        // Setup edit vs add mode
        if ($routeParams.mode == "edit") {

        } else {
            vm.title = "Create a Mixed Drink"
        }

        updateUser();

        // Listen for changes in login state
        login.logInSubscribe($scope, updateUser);
    }

    // Process form data into final drink data
    // TODO: Actually submit to server
    vm.submit = function () {
        vm.drink = {
            name: vm.name,
            description: vm.description,
            instructions: vm.instructions,
            dbIngredients: [],
            userIngredients: []
        }

        // Iterate through raw ingredient array and sort into appropriate arrays
        for (var i = 0; i < vm.ingredients.length; i ++) {
            var ingredient = vm.ingredients[i];

            if (ingredient.type == "db") {
                ingredient.type = undefined;
                vm.drink.dbIngredients.push(ingredient)
            } else {
                ingredient.type = undefined;
                vm.drink.userIngredients.push(ingredient)
            }
        }
    }

    // Update ingredient model from component data
    vm.updateIngredient = function (ingredient, type, drink, amount) {
        ingredient.type = type;
        ingredient.drink = drink;
        ingredient.amount = amount;
    }

    // Add ingredient input by adding new object to ingredients array
    vm.addIngredient = function () {
        vm.ingredients.push({})
    }
}