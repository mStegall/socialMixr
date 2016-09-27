import * as angular from 'angular';
import { drinkService } from '../drinkData'

class drinkFormCtrl {
    static $inject = ['drinkData']

    constructor(
        private drinkData: drinkService
    ) { }

    // Inputs
    drink: any;
    submitEnabled: any;
    publicCheck: any;
    submit: any;
    cancel: any;

    // Declarations
    categories: any;
    types: any;
    subtypes: any;
    displayAbv: number;

    // Initialization
    abvMode: string = "200";


    $onInit() {
        this.categories = this.drinkData.getCategories();
        this.types = this.drinkData.getTypes();
        this.subtypes = this.drinkData.getSubtypes();
    }

    $onChanges(changes) {
        if (changes.drink) {
            if (this.drink.$promise) {
                this.drink.$promise.then(this.drinkCopy.bind(this));
            } else {
                this.drinkCopy();
            }
        }
    }


    drinkCopy() {
        this.drink = angular.copy(this.drink);
        if (this.drink.abv) {
            this.displayAbv = this.drink.abv * parseInt(this.abvMode);
        }
    }

    formSubmit() {
        if (this.drink.subtype && this.drink.subtype.id) {
            this.drink.subtypeId = this.drink.subtype.id
            delete this.drink.subtype
        }

        if (this.drink.type && this.drink.type.id) {
            this.drink.typeId = this.drink.type.id
            delete this.drink.type
        }



        this.submit({
            drink: this.drink
        })
    }

    numberChange() {
        this.drink.abv = this.displayAbv / parseInt(this.abvMode);
    };

    modeChange() {
        this.displayAbv = this.drink.abv * parseInt(this.abvMode);
    }

    checkValid(comp) {
        return {
            'has-success': comp.$valid,
            'has-error': comp.$invalid
        };
    };
}

angular.module('app').component('drinkForm', {
    templateUrl: '/addEditDrink/drinkForm.html',
    controller: drinkFormCtrl,
    bindings: {
        submit: '&',
        cancel: '&',
        submitEnabled: '<',
        publicCheck: '<?',
        drink: '<'
    }
})