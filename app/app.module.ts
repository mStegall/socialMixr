import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth';
import { DrinkService, MixedDrinkService } from './drinkData';
import { UserService } from './profile';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    AuthService,
    DrinkService,
    MixedDrinkService,
    UserService
  ]
})
export class AppModule { }