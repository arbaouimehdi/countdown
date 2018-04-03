import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../shared';
import { Countdown } from '../shared/models/countdown.model';

@Component({
  selector: 'app-countdown-page',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  countdown: Countdown = {} as Countdown;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    // Retreive the prefetched article
    this.route.data.subscribe(
      (data) => {
        if (data.countdown) {
          let launch_time = data.countdown.countdowns[0].launch_time;
          this.countdown = data.countdown;
          this.setCountDown(launch_time);

        }
      }
    );
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

  }

  setCountDown(date) {
    $('#countdown-timer').text(date).countDown();
  }

}
