angular.module('app').component('addMixedDrink', {
    templateUrl: '/addEditMixedDrink/addMixedDrink.html',
    controller: addEditMixedDrinkCtrl
})

function addEditMixedDrinkCtrl(drinkData, userInfo, login, $uibModal, $scope, mixedDrinkData) {
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
        
        vm.title = "Create a Mixed Drink"

        updateUser();

        // Listen for changes in login state
        login.logInSubscribe($scope, updateUser);
    }

    // Process form data into final drink data
    // TODO: Actually submit to server
    vm.submit = function () {
        var drink = {
            name: vm.name,
            creator: vm.user.id,
            description: vm.description,
            instructions: vm.instructions,
            drinkIngredients: [],
            customIngredients: [],
            review: vm.public
        }

        // Iterate through raw ingredient array and sort into appropriate arrays
        vm.ingredients.forEach(function(ingredient){
            if (ingredient.drinkId) {
                drink.drinkIngredients.push(ingredient);
            } else {
                drink.customIngredients.push(ingredient);
            }
        })

        mixedDrinkData.addMixedDrink(drink).$promise.then(function () {
            alert('success');
        })
    }

    // Update ingredient model from component data
    vm.updateIngredient = function (ingredient, data) {
        if(data.drinkId){
            ingredient.drinkId = data.drinkId
            delete ingredient.name
        } else {
            ingredient.name = data.name
            delete ingredient.drinkId
        }

        ingredient.amount = data.amount
    }

    // Add ingredient input by adding new object to ingredients array
    vm.addIngredient = function () {
        vm.ingredients.push({})
    }
}