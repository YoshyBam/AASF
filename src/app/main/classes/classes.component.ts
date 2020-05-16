import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

//services
import { classService } from 'src/app/services/subscribers/class.service';

//interfaces
import { Class } from 'src/app/models/class.interface';


@Component({
  selector: 'app-classes',
  templateUrl: 'classes.component.html',
  styleUrls: ['classes.component.scss']
})
export class ClassesComponent implements OnInit, OnDestroy{

  classes: Array<Class>

  getAllClassesSubscription: Subscription;
  deleteClassSubscription: Subscription;

  constructor(private classService: classService, public router: Router) {
    this.classes = new Array<Class>();
    this.classService.getAllClasses();

  }

  ngOnInit() {
    this.getAllClassesSubscription = this.classService.getAllClassesSubject.subscribe({
      next: (res) => {

        if(isNullOrUndefined(res.error)) {
          
          this.classes = res;

        } else {

          console.log(res);

        }

      }
    });

    this.deleteClassSubscription = this.classService.deleteClassSubject.subscribe({
      next: (res) => {
        if(isNullOrUndefined(res.error)) {
          
          this.classService.getAllClasses();
          console.log(res);
        } else {
          console.log(res);
        }
      }
    })

  }
  ngOnDestroy() {
    this.getAllClassesSubscription.unsubscribe();
    this.deleteClassSubscription.unsubscribe();
  }


  classAction(e: { target: HTMLInputElement }, i: number) {
    switch(e.target.id) {

      case "edit":
        console.log("edit"); //TODO
        break;

      case "delete":
        this.hide_delete = false;
        this.delete_this = i;
        break;

      default:
        this.router.navigate(['/classes/single'], { queryParams: { class: this.classes[i].id }});
        break;

    }
  }
  

  //for hiding the add branch component
  hide_delete = true;
  delete_this: number = null;
  responseDialog(e: { close: boolean, output: string, index: number }) { 
    this.hide_delete = e.close;
    
    if(e.output == "true") {
      this.classService.deleteClass(this.classes[e.index].id);
    }

    this.hide_delete = e.close;
    this.delete_this = null;

  }

  outsideDialog(e: { target: HTMLInputElement }) {
    if(e.target.id == 'must-close')
      this.hide_delete = true;
  }

}
