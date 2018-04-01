import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CountdownComponent } from './countdown.component';
import { SharedModule } from '../shared';

const countdownRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: CountdownComponent
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
  providers: []
})
export class CountdownModule {}
