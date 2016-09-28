import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthService } from './auth';

@NgModule({
  imports: [BrowserModule],
  providers: [AuthService]
})
export class AppModule { }