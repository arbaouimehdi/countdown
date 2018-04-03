import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared';
import { Countdown } from '../../shared/models/countdown.model';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  countdown: Countdown;
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {
    console.log('Admin Dshboard');
  }

}
