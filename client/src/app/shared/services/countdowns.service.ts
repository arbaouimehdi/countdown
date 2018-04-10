import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Countdown } from '../models/countdown.model';
import { Subscriber } from '../models/subscriber.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class CountdownsService {
  constructor (
    private apiService: ApiService
  ) {}

  get(slug): Observable<Countdown> {
    return this.apiService.get('/countdown')
  }

  save(countdown): Observable<Countdown> {
    // If we're updating an existing article
    let id = countdown.countdowns[0]._id;

    if (countdown) {
      return this.apiService.put(`/countdown/${id}`, countdown);
    }
  }

  add(subscriber): Observable<Subscriber>  {
    return this.apiService.post('/subscriber', subscriber);
  }

  upload(body) : Observable<Countdown>{
    return this.apiService.post('/upload', body);
  }


}
