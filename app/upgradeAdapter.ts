import { UpgradeAdapter } from '@angular/upgrade';
import { AppModule } from './app.module';

import { AuthService } from './auth';

import * as angular from 'angular';

export const upgradeAdapter = new UpgradeAdapter(AppModule);

// Declare adapted components
angular.module('app').factory('authService', upgradeAdapter.downgradeNg2Provider(AuthService));

// Bootstrap application
