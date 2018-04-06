import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../shared';
import { CountdownsService } from '../shared/services/countdowns.service';
import { Countdown } from '../shared/models/countdown.model';
import { Subscriber } from '../shared/models/subscriber.model';

@Component({
  selector: 'app-countdown-page',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  countdown: Countdown = {} as Countdown;
  subscriber: Subscriber = {} as Subscriber;
  subscriberForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  success: Boolean = false;

  constructor(
    private countdownsService: CountdownsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.subscriberForm = this.fb.group({
      email: ''
    });
  }

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

  submitForm() {

    // post the changes
    this.countdownsService
    .add(this.subscriberForm.value)
    .subscribe(
      complete => {

        this.success = true;
        $('.thanks').show();
        setTimeout(() => {
          console.log($('.thanks'));
          $('.thanks').hide();
        }, 3000)

      },
      err => {
        this.errors = err.errors;
        this.isSubmitting = false;
      }
    );
  }

}
