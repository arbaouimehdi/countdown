import { Component, Input } from '@angular/core';

import { Errors } from './models';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors = {};

  @Input()
  set errors(errorList) {
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${key} ${errorList.errors[key].message}`);
  }

  get errorList() { return this.formattedErrors; }


}
