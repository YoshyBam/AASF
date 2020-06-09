import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined, isNull } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { lectureService } from 'src/app/services/subscribers/lecture.service';
import { authService } from 'src/app/services/auth.service';
//interfaces


@Component({
  selector: 'app-start-lecture',
  templateUrl: 'start-lecture.component.html',
  styleUrls: ['start-lecture.component.scss']
})
export class StartLectureComponent implements OnInit, OnDestroy{

  StartLectureSubscription: Subscription;

  start: string = null;
  start_time: string = null;
  end: string = null;
  end_time: string = null;

  classID: string = null;

  constructor(private auth: authService, private lectureService: lectureService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.classID = params['class'];
    });

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

  ngOnDestroy() { 
    this.StartLectureSubscription.unsubscribe(); 
  }

  submit() {
    // console.log(this.format());
    this.lectureService.startLecture(this.classID, this.format() )
  }

  format() {

    let temp = new Date(this.start);
    let s = new Date(temp).toISOString();
    let st = s.substr(0, s.indexOf('T'));
    let new_start = st+'T'+this.start_time+':00.000Z';

    temp = new Date(this.end);
    let e = new Date(temp).toISOString();
    let en = s.substr(0, e.indexOf('T'));
    let new_end = en+'T'+this.end_time+':00.000Z';

    return { start: new_start, end: new_end };

  }

}
