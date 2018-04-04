import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/services/user.service';
import { SubscribersService } from '../../shared/services/subscribers.service';
import { Subscriber } from '../../shared/models/subscriber.model';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class AdminSubscriberResolver implements Resolve<Subscriber> {
  constructor(
    private subscribersService: SubscribersService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.subscribersService.get('/api/subscribers');
  }
}
