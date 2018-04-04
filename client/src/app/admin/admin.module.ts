import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminSubscribersComponent } from './subscribers/subscribers.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { CountdownComponent } from './countdown/countdown.component';

import { AdminAuthResolver } from './admin-auth-resolver.service';
import { AdminDashboardResolver } from './dashboard/admin-dashboard-resolver.service'
import { AdminSubscriberResolver } from './subscribers/subscribers-resolver.service';

import { SharedModule, FooterComponent, HeaderComponent, SidebarComponent } from '../shared';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminComponent,
    resolve: {
      isAuthenticated: AdminAuthResolver
    },
    children: [
      {
        path: 'subscribers',
        component: AdminSubscribersComponent,
        resolve: {
          subscriber: AdminSubscriberResolver
        }
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        resolve: {
          countdown: AdminDashboardResolver
        }
      }
    ]
  }

]);

@NgModule({
  imports: [
    adminRouting,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    AdminSubscribersComponent,
    AdminDashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    CountdownComponent,
  ],
  providers: [
    AdminAuthResolver,
    AdminDashboardResolver,
    AdminSubscriberResolver,
  ]
})
export class AdminModule {}
