import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared';

@Component({
  selector: 'admin-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
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
