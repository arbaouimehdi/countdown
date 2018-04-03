import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminDashboardComponent } from '../dashboard/dashboard.component';
import { CountdownsService } from '../../shared/services/countdowns.service';
import { AdminDashboardResolver } from '../dashboard/admin-dashboard-resolver.service'

const dashboardRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: AdminDashboardComponent,
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
  providers: [CountdownsService]
})
export class DashboardModule { }
