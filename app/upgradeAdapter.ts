import { UpgradeAdapter } from '@angular/upgrade';
import { AppModule } from './app.module';

import { AuthService } from './auth';
import { DrinkService, MixedDrinkService } from './drinkData';
import { UserService } from './profile';

import * as angular from 'angular';

export const upgradeAdapter = new UpgradeAdapter(AppModule);

// Declare adapted components
angular.module('app').factory('authService', upgradeAdapter.downgradeNg2Provider(AuthService));
angular.module('app').factory('drinkData', upgradeAdapter.downgradeNg2Provider(DrinkService));
angular.module('app').factory('mixedDrinkData', upgradeAdapter.downgradeNg2Provider(MixedDrinkService));
angular.module('app').factory('userInfo', upgradeAdapter.downgradeNg2Provider(UserService));

// Bootstrap application
