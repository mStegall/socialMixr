var angular = require('angular');

require('bootstrap/dist/js/bootstrap.js');
require('./common/site.js');

require('./common/style.css');
require('bootswatch/sandstone/bootstrap.css');

angular.module('app', [require('angular-resource'), require('angular-route'), require('angular-ui-bootstrap')])
    .config(require('./app.route.js'));

require('./drinkData/drinkData.service.js');
require('./addItem/addComponent.controller.js');
require('./common/percentage.filter.js');
require('./home/home.controller.js');
require('./login');
require('./profile');
require('./snoop');
require('./viewDrinks');
