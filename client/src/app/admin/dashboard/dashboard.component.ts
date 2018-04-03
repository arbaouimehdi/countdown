import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminDashboardResolver } from '../dashboard/admin-dashboard-resolver.service'
import { UserService } from '../../shared/services/user.service';
import { CountdownsService } from '../../shared/services/countdowns.service';
import { Countdown } from '../../shared/models/countdown.model';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [
    CountdownsService,
    AdminDashboardResolver
  ]
})
export class AdminDashboardComponent implements OnInit {

  countdown: Countdown = {} as Countdown;
  countdownForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private countdownsService: CountdownsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.countdownForm = this.fb.group({
      title: '',
      description: ''
    });
  }

  isAuthenticated: boolean;

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { countdown: Countdown }) => {
        if (data.countdown) {
          this.countdown = data.countdown;
          this.countdownForm.patchValue(data.countdown);
        }
      }
    );
  }

}
