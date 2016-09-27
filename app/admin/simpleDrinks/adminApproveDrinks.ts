import * as angular from 'angular';
import { AdminDrinksService } from './adminDrinks.service';
import { column } from '../../table';

class AdminApproveDrinksCtrl {
  static $inject = ['adminDrinks'];

  constructor(
    private adminDrinks: AdminDrinksService
  ) { }

  columns: column[] = [
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
  drinks: any[];
  sortOrder: string = 'name';
  toggle: boolean = true;

  $onInit() {
    this.drinks = this.adminDrinks.getReviewDrinks();
  };

  sortOrderSet(field) {
    if (this.sortOrder === field) {
      this.sortOrder = '-' + field;
    } else {
      this.sortOrder = field;
    }
  };


  approveDrink(id) {
    var drink = this.adminDrinks.approveDrink(id);

    drink.$promise.then(() => {
      this.drinks = this.removeDrink(this.drinks, id);
    });

  };

  rejectDrink(id) {
    var del = this.adminDrinks.rejectDrink(id);
    del.$promise.then(() => {
      this.drinks = this.removeDrink(this.drinks, id);
    });
  };

  removeDrink(drinks, id) {
    return drinks.filter(obj => obj.id !== id);
  }
}

angular.module('app').component('adminApproveDrinks', {
  templateUrl: '/admin/simpleDrinks/adminApproveDrinks.html',
  controller: AdminApproveDrinksCtrl
});