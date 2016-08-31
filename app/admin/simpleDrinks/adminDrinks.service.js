(function () {
    angular.module('app').factory('adminDrinks', function ($resource) {
        "ngInclude";
        return {
            getReviewDrinks: function () {
                return $resource('/data/drinksReview').query();
            },
            approveDrink: function (id) {
                return $resource('/data/drink/:id/approve', { id: id }).save();
            },
            rejectDrink: function (id) {
                return $resource('/data/drink/:id/reject', { id: id }).save();
            },
            getUnapprovedDrinks: function () {
                return $resource('/data/drinksUnapproved').query();
            },
            flagDrink: function (id) {
                return $resource('/data/drink/:id/flag', { id: id }).save();
            }
        }
    })
})()