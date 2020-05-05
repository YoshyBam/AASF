import { Component, OnDestroy, OnInit } from '@angular/core';
import { classService } from 'src/app/services/subscribers/class.service';
import { Class } from 'src/app/models/class.interface';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-classes',
  templateUrl: 'classes.component.html',
  styleUrls: ['classes.component.scss']
})
export class ClassesComponent implements OnInit, OnDestroy{

  classes: Array<Class> = []

  getAllClassesSubscription: Subscription;

  constructor(private classService: classService) {
  }

  ngOnInit() {
    this.getAllClassesSubscription = this.classService.getAllClassesSubject.subscribe({
      next: (res) => {

        if(isNullOrUndefined(res.error)) {

          console.log(res);
          this.classes = [
            { "id": 0, "name": "P175054", "schedule": "Monday 13:30", "teacher_id": 0},
            { "id": 0, "name": "P175055", "schedule": "Fryday 9AM", "teacher_id": 0},
            { "id": 0, "name": "P175056", "schedule": "Monday 12PM", "teacher_id": 0},
            { "id": 0, "name": "P175057", "schedule": "Thursday 10:30", "teacher_id": 0},
            { "id": 0, "name": "P175058", "schedule": "Tuesday 2PM", "teacher_id": 0},
            { "id": 0, "name": "P185064", "schedule": "Monday 4PM", "teacher_id": 0},
          ]

        } else {

          console.log(res);

        }

      }
    });

    this.classService.getAllClasses();
  }
  ngOnDestroy() {
    this.getAllClassesSubscription.unsubscribe();
  }


  classAction(e: { target: HTMLInputElement }, i: number) {
    switch(e.target.id) {

      case "edit":
        console.log("edit"); //TODO
        break;

      case "delete":
        console.log("delete"); //TODO
        break;

      default:
        console.log("default"); //TODO
        break;

    }
  }

}
