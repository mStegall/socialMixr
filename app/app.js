var angular = require('angular');
var _ = require('lodash');

require('bootstrap/dist/js/bootstrap.js');
require('./common/site.js');


require('bootswatch/sandstone/bootstrap.css');
require('./common/style.scss');

angular.module('app', [require('angular-resource'), require('angular-route'), require('angular-ui-bootstrap')]);

require('./drinkData/drinkData.service.js');
require('./addItem/addComponent.controller.js');
require('./common/percentage.filter.js');
require('./login');
require('./profile');
require('./snoop');
require('./viewDrinks');
require('./admin');
require('./auth');
require('./editDrink');

require('./app.route.js');