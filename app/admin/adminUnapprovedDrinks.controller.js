angular.module('app').component('adminUnapprovedDrinks', {
    templateUrl: '/admin/adminUnapprovedDrinks.html',
    controller: adminSimpleDrinksCtrl
});

function adminSimpleDrinksCtrl(adminData) {
    "ngInclude";

    var mv = this;

    mv.$onInit = function () {
        mv.sortOrder = 'name';
        mv.toggle = true;
        mv.drinks = adminData.getUnapprovedDrinks();
    };

    mv.sortOrderSet = function (field) {
        if (mv.sortOrder == field) {
            mv.sortOrder = '-' + field;
        } else {
            mv.sortOrder = field;
        }
    };

    mv.sortArrows = function (field) {
        return {
            'glyphicon': true,
            'glyphicon-triangle-bottom': mv.sortOrder != '-' + field,
            'glyphicon-triangle-top': mv.sortOrder == '-' + field
        };
    };

    mv.setArrowColor = function (field) {
        if (mv.sortOrder.includes(field)) {
            return {color: 'black'};
        } else {
            return {color: '#ccc'};
        }
    };

    function removeDrink(id) {
        mv.drinks = mv.drinks.filter(function(obj) {
            return obj._id != id;
        })
    }
};

