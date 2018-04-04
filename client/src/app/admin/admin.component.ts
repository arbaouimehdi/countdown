import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('admin/dashboard');
        } else {
          this.setListTo('admin');
        }
      }
    );
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If admin is requested but user is not authenticated, redirect to login
    if (type === 'admin' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    // if (type === 'admin/dashboard' && this.isAuthenticated) {
    //   this.router.navigateByUrl('/admin/dashboard');
    //   return;
    // }
    // if (type === 'admin/subscribers' && this.isAuthenticated) {
    //   this.router.navigateByUrl('/admin/subscribers');
    //   return;
    // }

  }
}
