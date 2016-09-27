import * as angular from 'angular';
import { AdminDrinksService } from './adminDrinks.service';
import { Column } from '../../table';

class AdminUnapprovedDrinksCtrl {
  static $inject = ['adminDrinks'];

  constructor(
    private adminDrinks: AdminDrinksService
  ) { }

  columns: Column[] = [
    {
      name: 'name',
      title: 'Name'
    }, {
      name: 'type',
      title: 'Type'
    }, {
      name: 'abv',
      title: 'ABV',
      hiddenXs: true
    }, {
      name: '',
      title: '',
      unsortable: true
    }
  ];

  sortOrder = 'name';
  toggle = true;
  drinks: any[];

  $onInit() {
    this.drinks = this.adminDrinks.getUnapprovedDrinks();
  };

  sortOrderSet (field) {
    if (this.sortOrder === field) {
      this.sortOrder = '-' + field;
    } else {
      this.sortOrder = field;
    }
  };
}

angular.module('app').component('adminUnapprovedDrinks', {
  templateUrl: '/admin/simpleDrinks/adminUnapprovedDrinks.html',
  controller: AdminUnapprovedDrinksCtrl
});