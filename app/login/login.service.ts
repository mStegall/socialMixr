import * as angular from 'angular';
import 'angular-ui-bootstrap';

export class LoginService {
    static $inject = ["$http", "$q", "userInfo", "$rootScope", "$uibModal"];

    constructor(
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private userInfo,
        private $rootScope: ng.IRootScopeService,
        private $uibModal: ng.ui.bootstrap.IModalService
    ) { }

    private loggedIn: boolean = false;

    logInModal() {
        return this.$uibModal.open({
            templateUrl: '/login/logInModal.html',
            controller: 'logInModalCtrl',
            controllerAs: '$ctrl'
        });
    }

    logInState() {
        return this.loggedIn;
    }

    logInSubscribe(scope: ng.IScope, cb) {
        scope.$on('Log In State Changed', cb);
    }

    logIn(username: string, password: string) {
        return this.$http.post('/login', { username: username, password: password })
            .then((response) => {
                this.loggedIn = true;
                this.userInfo.setUser(response.data);
                this.$rootScope.$broadcast('Log In State Changed');
            })
            .catch(() => {
                this.loggedIn = false;
            });
    }

    logOut() {
        return this.$http.post('/logout', {}).
            then((response) => {
                this.loggedIn = false;
                this.userInfo.clearUser();
                this.$rootScope.$broadcast('Log In State Changed');
            });
    }

    updateLoginState() {
        return this.$http.get('/loggedIn')
            .then((response) => {
                this.loggedIn = true;
                this.userInfo.setUser(response.data);
                this.$rootScope.$broadcast('Log In State Changed');
            })
            .catch(() => {
                this.loggedIn = false;
                this.$rootScope.$broadcast('Log In State Changed');
            });
    }

}

angular.module('app').service('login', LoginService);