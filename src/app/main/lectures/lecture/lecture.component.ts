import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { authService } from 'src/app/services/auth.service';
import { lectureService } from 'src/app/services/subscribers/lecture.service';
import { Lecture } from 'src/app/models/lecture.interface';

//interfaces


@Component({
  selector: 'app-lecture',
  templateUrl: 'lecture.component.html',
  styleUrls: ['lecture.component.scss']
})
export class LectureComponent implements OnInit, OnDestroy {

  lectures: Array<Lecture>;
  classID: string = null;
  show_actions: boolean = false;

  getLecturesSubscription: Subscription;
  checkInSubscription: Subscription;
  
  constructor(private auth: authService, private lectureService: lectureService, public router: Router, public route: ActivatedRoute) {
    
    this.route.queryParams.subscribe(params => {
      this.classID = params['class'];
    });

    switch(this.auth.user.role) {
      case "student" : 
        setTimeout( () => this.lectureService.getLectures(this.classID), 0);
        break;
      case "teacher" : 
        this.show_actions = true;
        setTimeout( () => this.lectureService.getLectures(this.classID), 0);
        break;
      case "admin" : 
        this.show_actions = true;
        setTimeout( () => this.lectureService.getLectures(this.classID), 0);
        break;
      default : 
        this.router.navigate(['/login']);
        break;
    }

    

  }


  ngOnInit() {

    this.getLecturesSubscription = this.lectureService.getLecturesSubject.subscribe({
      next: (res) => {
        if(isNullOrUndefined(res.error)) {

          console.log(res);
          this.lectures = new Array<Lecture>();
          this.lectures = res;

        } else {

          console.log(res);

        }
      }
    });

  }
  ngOnDestroy() {
    this.getLecturesSubscription.unsubscribe();
  }
  lectureAction(e: { target: HTMLInputElement }, i: number) {
    
    switch(this.auth.user.role) {
      case "student" : 
        this.router.navigate(['/lectures/check-in'], { queryParams: { code: this.lectures[i].checkInCode, class: this.classID }})
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
  

}
