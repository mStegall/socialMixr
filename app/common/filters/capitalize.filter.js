(function(){
    angular.module('app').filter('capitalize', function(){
        return function(val){
            return val.slice(0, 1).toUppercase + val.slice(1);
        }
    })
})()