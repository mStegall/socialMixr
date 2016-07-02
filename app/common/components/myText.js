angular.module('app').component('myText', {
    templateUrl: '/common/components/myText.html',
    bindings: {
        label: '@',
        value: '='
    }
    
});