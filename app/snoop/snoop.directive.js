angular.module('app').directive('mySnooper', function ($window, $compile) {
    return {
        link: function (scope, element, attrs, controller) {
            scope.width = $window.innerWidth;
            scope.height = $window.innerHeight;

            angular.element($window).resize(function () {
                console.log("hello");
                scope.width = $window.innerWidth;
                scope.height = $window.innerHeight;
                scope.$digest();
            });

            var markup = "<p><strong>Viewport width: </strong>{{width}}</p>" +
                "<br>" +
                "<p><strong>Viewport Height: </strong>{{height}}</p>";

            angular.element(element).html($compile(markup)(scope));
        }
    };

    // MWE of dad's code
    // return {
    //     link: function (scope, element) {
    //         scope.$watch(function () {
    //             return {
    //                 'h': $window.innerHeight,
    //                 'w': $window.innerWidth
    //             };
    //         }, function (newValue, oldValue) {
    //             scope.windowHeight = newValue.h;
    //             scope.windowWidth = newValue.w;
    //         }, true);
    //
    //         angular.element($window).resize(function () {
    //             scope.$apply();
    //         })
    //     }
    // }
});