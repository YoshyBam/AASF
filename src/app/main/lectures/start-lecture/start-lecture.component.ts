import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined, isNull } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { classService } from 'src/app/services/subscribers/class.service';

//interfaces
import { Class } from 'src/app/models/class.interface';
import { lectureService } from 'src/app/services/subscribers/lecture.service';

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
  lectureID: string = null;

  constructor(private lectureService: lectureService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.classID = params['class'];
      this.lectureID = params['lecture'];
    });

  }

  ngOnInit() {
    this.StartLectureSubscription = this.lectureService.startLectureSubject.subscribe({
      next: (res) => {
        if(isNullOrUndefined(res.error)) {
          console.log(res);
          this.router.navigate(['/lectures']);
        } else {
          console.log(res);
        }
      }
    });
  }

  ngOnDestroy() { this.StartLectureSubscription.unsubscribe(); }

  submit() {
    this.lectureService.startLecture(this.classID, this.lectureID, { start: this.start, end: this.end } )
  }

}
