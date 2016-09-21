var angular = require('angular');
var _ = require('lodash');

require('bootstrap/dist/js/bootstrap.js');
require('./common/site.js');

require('./common/style.scss');

angular.module('app', [require('angular-resource'), require('angular-route'), require('angular-ui-bootstrap')]);

require('./drinkData');
require('./addEditDrink');
require('./login');
require('./profile');
require('./snoop');
require('./viewDrinks');
require('./admin');
require('./auth');
require('./common');
require('./addEditMixedDrink');
require('./viewMixedDrinks');
require('./table');

require('./app.route.js');