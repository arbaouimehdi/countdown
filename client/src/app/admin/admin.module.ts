import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminSubscribersComponent } from './admin-subscribers.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminAuthResolver } from './admin-auth-resolver.service';
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
        component: AdminSubscribersComponent
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
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
  ],
  providers: [
    AdminAuthResolver
  ]
})
export class AdminModule {}
