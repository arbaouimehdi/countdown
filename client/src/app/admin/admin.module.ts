import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminSubscribersComponent } from './admin-subscribers.component';
import { AdminAuthResolver } from './admin-auth-resolver.service';
import { SharedModule, FooterComponent, HeaderComponent } from '../shared';

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
          isAuthenticated: AdminAuthResolver
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
    FooterComponent,
    HeaderComponent,
  ],
  providers: [
    AdminAuthResolver
  ]
})
export class AdminModule {}
