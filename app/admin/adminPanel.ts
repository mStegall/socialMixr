import * as angular from 'angular';
import 'angular-route';
import {AuthService} from '../auth/auth.service';

class AdminPanelCtrl {
  static $inject = ['authService', '$routeParams'];

  constructor(
    private authService: AuthService,
    private $routeParams: ng.route.IRouteParamsService
  ){}

  page: string = 'users';
  pageTitle: string;

  list = [
    {
      name: 'users',
      title: 'Users'
    },
    {
      name: 'approveDrinks',
      title: 'Approve Drinks'
    },
    {
      name: 'unapprovedDrinks',
      title: 'Unapproved Drinks'
    },
    {
      name: 'approveMixedDrinks',
      title: 'Approve Mixed Drinks'
    }
  ];

  $onInit(){
    // this.authService.roleRouter('admin');

    let page = this.$routeParams['page'];
    if (page) {
      this.page = page;
    }

    this.pageTitle = this.list.filter(item =>item.name === this.page)[0].title;
  }

  
}

angular.module('app').component('adminPanel', {
  templateUrl: "/admin/adminPanel.html",
  controller: AdminPanelCtrl
});