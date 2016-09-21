(function () {
    angular.module('app').factory('adminMixedDrinks', function ($resource) {
        "ngInclude";

        return {
            getReviewDrinks: getReviewDrinks,
            getUnapprovedDrinks: getUnapprovedDrinks,
            approveDrink: approveDrink,
            rejectDrink: rejectDrink,
            flagDrink: flagDrink
        }

        function getReviewDrinks() {
            return $resource('/api/admin/mixedDrinks/review').query();
        }
        function getUnapprovedDrinks() {
            return $resource('/api/admin/mixedDrinks/unapproved').query();
        }
        function approveDrink(id) {
            return $resource('/api/admin/mixedDrink/:id/approve', { id: id }).save();
        }
        function rejectDrink(id) {
            return $resource('/api/admin/mixedDrink/:id/reject', { id: id }).save();
        }
        function flagDrink(id) {
            return $resource('/api/admin/mixedDrink/:id/flag', { id: id }).save();
        }
    })
})() 