import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminSubscribersComponent } from '../subscribers/subscribers.component';
import { SubscribersService } from '../../shared/services/subscribers.service';
import { AdminDashboardResolver } from '../dashboard/admin-dashboard-resolver.service'

const dashboardRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: AdminSubscribersComponent,
    resolve: {
      countdown: AdminDashboardResolver
    }
  }
]);

@NgModule({
  imports: [
    dashboardRouting
  ],
  declarations: [],
  providers: [SubscribersService]
})
export class SubscribersModule { }
