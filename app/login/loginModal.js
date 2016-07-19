angular.module('app').controller('loginModalCtrl', loginModalCtrl)

function loginModalCtrl (login, $uibModal, $uibModalInstance) {
    "ngInclude";

    var vm = this;

    vm.alerts = [];

    vm.closeAlert = function(index) {
        vm.alerts.splice(index, 1);
    };
    
    vm.login = function () {
        login.logIn(vm.username, vm.password).then(
            function () {
                $uibModalInstance.close("Logged In")
            },
            function (response) {
                vm.alerts = [{msg: response}]
            }
        );
    };

    vm.signUp = function () {
      var modal = $uibModal.open({
          templateUrl: '/login/signUpModal.html',
          controller: 'signUpModalCtrl',
          controllerAs: '$ctrl'
      })
    }
};