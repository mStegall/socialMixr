angular.module('app').factory('adminData', function ($resource) {
    "ngInclude";
    return {
        getUsers: function () {
            return $resource('/data/users').query()
        },
        getReviewDrinks: function () {
            return $resource('/data/drinksReview').query();
        },
        approveDrink: function (id) {
            return $resource('/data/approveDrink/:id').save({id: id});
        },
        rejectDrink: function (id) {
            return $resource('/data/rejectDrink').save({id: id});
        },
        getUnapprovedDrinks: function () {
            return $resource('/data/drinksUnapproved').query();
        }
    }
});