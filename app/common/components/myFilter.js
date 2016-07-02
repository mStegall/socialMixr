angular.module('app').component('myFilter', {
    templateUrl: '/common/components/myFilter.html',
    transclude: true,
    bindings: {
        toggle: '=',
        label: '@',
        texts: '='
    },
    controller: function () {
        var vm = this;

        for (text in texts) {
            vm[text.key] = [text.value];
        }

        vm.onUpdate
    }
});