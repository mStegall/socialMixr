angular.module('app').factory('adminData', function ($resource) {
    "ngInclude";
    return {
        getUsers: function () {
            return $resource('/data/users').query()
        },
        getUnapprovedDrinks: function () {
            return $resource('/data/drinksUnapproved').query();
        },
        approveDrink: function (id) {
            return $resource('/data/approveDrink/:id', {id: id}).save();
        },
        rejectDrink: function (id) {
            return $resource('/data/rejectDrink').save({id: id});
        }
    }
});