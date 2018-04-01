import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared';

@Component({
  selector: 'app-admin-subscribers',
  templateUrl: './admin-subscribers.component.html',
  styleUrls: ['./admin-subscribers.component.css']
})
export class AdminSubscribersComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {

  }

}
