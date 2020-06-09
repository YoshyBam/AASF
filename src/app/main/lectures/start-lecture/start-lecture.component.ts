import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined, isNull } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { classService } from 'src/app/services/subscribers/class.service';

//interfaces
import { Class } from 'src/app/models/class.interface';
import { lectureService } from 'src/app/services/subscribers/lecture.service';
import { authService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-start-lecture',
  templateUrl: 'start-lecture.component.html',
  styleUrls: ['start-lecture.component.scss']
})
export class StartLectureComponent implements OnInit, OnDestroy{

  StartLectureSubscription: Subscription;

  start: string = null;
  end: string = null;

  classID: string = null;

  constructor(private auth: authService, private lectureService: lectureService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.classID = params['class'];
    });

    switch(this.auth.user.role) {
      case "student" : 
        break;
      case "teacher" : 
        break;
      case "admin" : 
        break;
      default : 
        this.router.navigate(['/login']);
        break;
    }

  }

  ngOnInit() {
    this.StartLectureSubscription = this.lectureService.startLectureSubject.subscribe({
      next: (res) => {
        if(isNullOrUndefined(res.error)) {

          console.log(res);
          this.router.navigate(['/lectures/single'], { queryParams: { class: this.classID } });

        } else {
          console.log(res);
        }
      }
    });
  }

  ngOnDestroy() { this.StartLectureSubscription.unsubscribe(); }

  submit() {
    this.lectureService.startLecture(this.classID, { start: this.start, end: this.end } )
  }

}
