import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CountdownsService, UserService } from '../../shared';
import { Countdown } from '../../shared/models/countdown.model';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class AdminDashboardResolver implements Resolve<Countdown> {
  constructor(
    private countdownsService: CountdownsService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.countdownsService.get('/api/countdown');
  }
}
