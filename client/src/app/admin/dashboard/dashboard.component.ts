import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  countdown: Countdown;
  isSubmitting = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countdownsService: CountdownsService,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { article: Countdown }) => {
        console.log(data);
      }
    );
  }

}
