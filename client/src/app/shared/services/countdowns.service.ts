import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Countdown } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class CountdownsService {
  constructor (
    private apiService: ApiService
  ) {}

  get(slug): Observable<Countdown> {
    return this.apiService.get('/countdown')
  }

  save(article): Observable<Countdown> {
    return
  }



}
