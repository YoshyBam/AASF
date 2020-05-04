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
