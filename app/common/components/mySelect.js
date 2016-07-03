angular.module('app').component('mySelect', {
    templateUrl: '/common/components/mySelect.html',
    bindings: {
        label: '@',
        value: '=',
        array: '='
    }
});