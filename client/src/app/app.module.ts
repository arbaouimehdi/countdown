import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { CountdownModule } from './countdown/countdown.module';
import { DashboardModule } from './admin/dashboard/dashboard.module'
import { SubscribersModule } from './admin/subscribers/subscribers.module'

import { AdminModule } from './admin/admin.module';

import {
  ApiService,
  AuthGuard,
  FooterComponent,
  JwtService,
  SharedModule,
  UserService,
  HttpTokenInterceptor
} from './shared';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([])

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    CountdownModule,
    DashboardModule,
    SubscribersModule,
    AdminModule,
    rootRouting,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    ApiService,
    AuthGuard,
    JwtService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
