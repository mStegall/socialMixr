(function () {
    angular.module('app').controller('signUpModalCtrl', signUpModalCtrl)

    function signUpModalCtrl(login, $uibModalInstance, $resource) {
        "ngInclude";

        var vm = this

        vm.alerts = []

        vm.closeAlert = function (index) {
            vm.alerts.splice(index, 1)
        }

        vm.submit = function () {
            var req = $resource('/signUp').save(vm.user)
            req.$promise.then($uibModalInstance.close("Signed Up"))
        }

        vm.checkValid = function (comp) {
            return {
                'has-success': comp.$valid,
                'has-error': comp.$invalid
            }
        }
    }
})()