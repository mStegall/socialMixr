(function () {
    angular.module('app').factory('adminDrinks', function ($resource) {
        "ngInclude";
        return {
            getReviewDrinks: function () {
                return $resource('/api/admin/drinks/review').query();
            },
            getUnapprovedDrinks: function () {
                return $resource('/api/admin/drinks/unapproved').query();
            },
            approveDrink: function (id) {
                return $resource('/api/admin/drink/:id/approve', { id: id }).save();
            },
            rejectDrink: function (id) {
                return $resource('/api/admin/drink/:id/reject', { id: id }).save();
            },            
            flagDrink: function (id) {
                return $resource('/api/admin/drink/:id/flag', { id: id }).save();
            }
        }
    })
})()