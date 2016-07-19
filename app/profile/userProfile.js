(function () {
    angular.module('app').component('userProfile', {
        templateUrl: '/profile/userProfile.html',
        controller: userProfileCtrl
    })

    function userProfileCtrl(userInfo) {
        "ngInclude";

        var vm = this;

        vm.$onInit = function () {
            vm.user = userInfo.getUser();
        }
    }
})()