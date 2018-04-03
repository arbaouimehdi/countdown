import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CountdownComponent } from './countdown.component';
import { CountDownResolver } from './countdown-resolver.service';
import { CountdownsService } from '../shared/services/countdowns.service';
import { SharedModule } from '../shared';

const countdownRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: CountdownComponent,
    resolve: {
      countdown: CountDownResolver
    }
  }
]);

@NgModule({
  imports: [
    countdownRouting,
    SharedModule
  ],
  declarations: [
    CountdownComponent
  ],
  providers: [
    CountDownResolver
  ]
})
export class CountdownModule {}
