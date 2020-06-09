import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

//services

//interfaces
import { lectureService } from 'src/app/services/subscribers/lecture.service';
import { authService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-check-in',
  templateUrl: 'check-in.component.html',
  styleUrls: ['check-in.component.scss']
})
export class CheckInComponent implements OnInit, OnDestroy{

  checkInSubscription: Subscription;

  code: string = null;
  error: string = null;
  classID: number = null;

  constructor(private auth: authService, private lectureService: lectureService, private router: Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.classID = params['class'];
    });
    switch(this.auth.user.role) {
      case "student" : 
        break;
      case "teacher" : 
        break;
      case "admin" : 
        break;
    }
  }

  ngOnInit() {
    this.checkInSubscription = this.lectureService.checkInSubject.subscribe({
      next: (res) => {
        if(isNullOrUndefined(res.error)) {
          
          this.router.navigate(['/lectures/single'],{ queryParams: { class: this.classID } });
          
        } else {

          console.log(res);
          this.error = res.error;

        }
      }
    })
  }

  ngOnDestroy() {
    this.checkInSubscription.unsubscribe();
  }

  submit() {
    this.lectureService.checkIn(this.code);
  }

}
