import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Subscriber } from '../models/subscriber.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class SubscribersService {
  constructor (
    private apiService: ApiService
  ) {}

  get(slug): Observable<Subscriber> {
    return this.apiService.get('/subscribers')
  }

  destroy(id) {
    return this.apiService.delete('/subscriber/' + id);
  }

}
