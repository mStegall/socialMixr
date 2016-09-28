import * as angular from 'angular';
import 'angular-resource';
import 'angular-route';
import 'angular-ui-bootstrap';

import './pollyfill';



import 'bootstrap/dist/js/bootstrap.js';
import './common/site.js';

import './common/style.scss';

angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap']);

import './drinkData';
import './addEditDrink';
import './login';
import './profile';
import './viewDrinks';
import './admin';
import './auth';
import './common';
import './addEditMixedDrink';
import './viewMixedDrinks';
import './table';

import './app.route';

// angular.bootstrap(document.body, ['app'], {strictDi: true});
import './upgradeAdapter';