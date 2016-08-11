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
            return $resource('/data/admin/mixedDrinks/review').query();
        }
        function getUnapprovedDrinks() {
            return $resource('/data/admin/mixedDrinks/unapproved').query();
        }
        function approveDrink(id) {
            return $resource('/data/admin/mixedDrinks/approve').save({ id: id });
        }
        function rejectDrink(id) {
            return $resource('/data/admin/mixedDrinks/reject').save({ id: id });
        }
        function flagDrink(id) {
            return $resource('/data/admin/mixedDrinks/flag').save({ id: id });
        }
    })
})() 