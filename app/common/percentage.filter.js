angular.module('app').filter('percentage', function () {
    return function (val) {
        return String(Math.round(val * 100 * 100) /100) + "%"
    }
})