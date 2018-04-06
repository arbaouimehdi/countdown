import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { SubscribersService } from '../../shared/services/subscribers.service';

import { AdminSubscriberResolver } from './subscribers-resolver.service';
import { Subscriber } from '../../shared/models/subscriber.model';

@Component({
  selector: 'admin-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss'],
  providers: [
    SubscribersService,
    AdminSubscriberResolver
  ]
})

export class AdminSubscribersComponent implements OnInit {

  subscriber: Subscriber;
  subscribers: {};
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private subscribersService: SubscribersService,
    private router: Router,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {

    // jQuery Data table
    $(document).ready(function() {
      $('#subscribers-table').DataTable();
    });

    // Retreive the prefetched article
    this.route.data.subscribe(
      (data) => {
        this.subscribers = data.subscriber.subscribers;
      }
    );
  }

  deleteSubscriber(id) {

    // Remove Selected Subscriber from the View
    let updatedSubscribers = $.grep(this.subscribers, function(obj){
      if (obj._id !== id) {
        return obj;
      }
    });

    // Delete the Subscriber from the Database
    this.subscribersService.destroy(id)
      .subscribe(
        success => {
          this.subscribers = updatedSubscribers;
          this.router.navigateByUrl('/admin/subscribers');
        }
      );
  }

  getFullDate(date) {
    let full_date = date.substr(0, 10)
    return full_date;
  }

  getFullTime(date) {
    let d = new Date(date);
    let full_time = `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCHours()}`
    console.log(date.substr(11, 3));
    return full_time;
  }

}
