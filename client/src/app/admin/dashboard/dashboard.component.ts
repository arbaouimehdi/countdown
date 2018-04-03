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
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data) => {

        if (data) {

          this.countdownForm = this.fb.group({
            launch_time: data.countdown.countdowns[0].launch_time,
            title: data.countdown.countdowns[0].title,
            description: data.countdown.countdowns[0].description
          });

          this.countdown = data.countdown;
          this.countdownForm.patchValue(data.countdown);

        }
      }
    );

    // Time Picker
    $('#datetimepicker1').datetimepicker();
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    if ($('#datetimepicker1').val()){
      this.countdownForm.value.launch_time = $('#datetimepicker1').val();
    }

    // Update the model
    this.updateCountdown(this.countdownForm.value);

    // post the changes
    this.countdownsService
    .save(this.countdown)
    .subscribe(
      countdown => this.router.navigateByUrl('admin/dashboard'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );

  }

  updateCountdown(values: Object) {
    Object.assign(this.countdown, values);
  }

}
