import * as angular from 'angular';
import { AdminMixedDrinksService } from './adminMixedDrinks.service';
import { Column } from '../../table';

class AdminApproveMixedDrinksCtrl {
  static $inject = ['adminMixedDrinks'];

  constructor(
    private adminMixedDrinks: AdminMixedDrinksService
  ) { }

  columns: Column[] = [
    {
      name: 'name',
      title: 'Name'
    }, {
      name: 'name',
      title: 'Name',
      unsortable: true
    }, {
      name: '',
      title: '',
      unsortable: true
    }
  ];

  sortOrder: string = 'name';
  toggle: boolean = true;
  drinks: any[];

  $onInit() {
    this.drinks = this.adminMixedDrinks.getReviewDrinks();
  };

  sortOrderSet(field) {
    if (this.sortOrder === field) {
      this.sortOrder = '-' + field;
    } else {
      this.sortOrder = field;
    }
  };

  approveDrink(id) {
    var drink = this.adminMixedDrinks.approveDrink(id);

    drink.$promise.then(() => {
      this.drinks = this.removeDrink(this.drinks, id);
    });

  };

  rejectDrink(id) {
    var del = this.adminMixedDrinks.rejectDrink(id);
    del.$promise.then(() => {
      this.drinks = this.removeDrink(this.drinks, id);
    });
  };

  private removeDrink(drinks, id) {
    return drinks.filter(obj => obj.id !== id);
  }
}

angular.module('app').component('adminApproveMixedDrinks', {
  templateUrl: '/admin/mixedDrinks/adminApproveMixedDrinks.html',
  controller: AdminApproveMixedDrinksCtrl
});