import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map'

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { Http, Response } from '@angular/http';

import { AdminDashboardResolver } from '../dashboard/admin-dashboard-resolver.service'
import { UserService } from '../../shared/services/user.service';
import { CountdownsService } from '../../shared/services/countdowns.service';
import { Countdown } from '../../shared/models/countdown.model';
import { Errors } from '../../shared/models';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [
    CountdownsService,
    AdminDashboardResolver
  ]
})
export class AdminDashboardComponent implements OnInit {

  uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'entity'});

  countdown: Countdown = {} as Countdown;
  countdownForm: FormGroup;
  errors: Object = {};
  success: Boolean = false;
  isSubmitting = false;
  fileToUpload: File = null;

  constructor(
    private countdownsService: CountdownsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private el: ElementRef
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
             console.log("ImageUpload:uploaded:", item, status, response);
             alert(response);
         };

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

  // Submit the Form
  submitForm() {
    // this.isSubmitting = true;
    // this.errors = {errors: {}};

    // if ($('#datetimepicker1').val()){
    //   this.countdownForm.value.launch_time = $('#datetimepicker1').val();
    // }

    // Update the model
    //this.updateCountdown(this.countdownForm.value);

    // post the changes
    // this.countdownsService
    // .save(this.countdown)
    // .subscribe(
    //   success => {
    //     this.success = true;
    //     this.router.navigateByUrl('admin/dashboard')
    //   },
    //   err => {
    //     this.success = false;
    //     this.errors = err;
    //     this.isSubmitting = false;
    //   }
    // );

    // Update logo
    let formData : FormData = new FormData();
    formData.append('entity', this.fileToUpload, this.fileToUpload.name);
    // formData.append('entity', this.fileToUpload, this.fileToUpload.name);
    // headers = headers.set('Content-Type', 'multipart/form-data');
    this.countdownsService.upload(formData)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
    );

  }

  //
  updateCountdown(values: Object) {
    Object.assign(this.countdown, values);
  }

  //
  fileChangeEvent(files : FileList) {
    this.fileToUpload = files.item(0);
    this.countdown.logo = this.fileToUpload.name;
  }

  setFileHeader() {
    return new HttpHeaders({
       'Accept': 'application/json',
    });
  }

  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    console.log("iam+ "+inputEl);
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
        for (let i = 0; i < fileCount; i++) {
            formData.append('photo', inputEl.files.item(i));
        }
        this.http
            .post(URL, formData).map((res:any) => res).subscribe(
                (success) => {
                 alert(success._body);
              },
                (error) => alert(error)
            );

    }
   }


}
