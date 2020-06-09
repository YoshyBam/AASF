import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

//services
import { classService } from 'src/app/services/subscribers/class.service';

//interfaces
import { Class } from 'src/app/models/class.interface';
import { lectureService } from 'src/app/services/subscribers/lecture.service';

@Component({
  selector: 'app-check-in',
  templateUrl: 'check-in.component.html',
  styleUrls: ['check-in.component.scss']
})
export class CheckInComponent implements OnInit, OnDestroy{

  checkInSubscription: Subscription;

  code: string = null;
  error: string = null;

  constructor(private lectureService: lectureService, private router: Router) { }

  ngOnInit() {
    this.checkInSubscription = this.lectureService.checkInSubject.subscribe({
      next: (res) => {
        if(isNullOrUndefined(res.error)) {
          
          this.router.navigate(['/']);
          
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
