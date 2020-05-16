import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';

//services
import { classService } from 'src/app/services/subscribers/class.service';

///interfaces
import { Student } from 'src/app/models/students.interface';


@Component({
  selector: 'app-students',
  templateUrl: 'students.component.html',
  styleUrls: ['students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {

  students: Array<Student>;
  selectStudent: Array<boolean>;
  id: number


  deleteStudentsSubscription: Subscription;
  getAllStudentsSubscription: Subscription;


  constructor(private classService: classService, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.id = params['class'];
    });

    this.selectStudent = new Array<boolean>()
    this.classService.getAllClassStudents(this.id);
  }

  ngOnInit() {

    this.deleteStudentsSubscription = this.classService.removeStudentsSubject.subscribe({
      next: (res) => {
        if(isNullOrUndefined(res.error)) {
          console.log(res);
        } else {
          console.log(res);
        }
      }
    });

    this.getAllStudentsSubscription = this.classService.getAllClassStudentsSubject.subscribe({
      next: (res) => {

        if(isNullOrUndefined(res.error)) {

          this.selectStudent = new Array<boolean>();
          console.log(res);
          this.students = res;
          res.forEach(r => this.selectStudent.push(false) );

        } else {

          console.log(res);

        }

      }
    });

  }
  ngOnDestroy() {
    this.deleteStudentsSubscription.unsubscribe();
    this.getAllStudentsSubscription.unsubscribe();
  }

  deleteStudents() {
    this.delete_this = new Array<number>();

    for(let i = 0; i < this.students.length; i++)
      if(this.selectStudent[i])
        this.delete_this.push(this.students[i].id);
    this.hide_delete = false;


  }
  

  //for hiding the add branch component
  hide_delete = true;
  delete_this: Array<number> = null;
  responseDialog(e: { close: boolean, output: string, index: Array<number> }) { 
    this.hide_delete = e.close;
    console.log(e);
    
    if(e.output == "true") {
      let ids = new Array<number>();

      e.index.forEach(i => {
        ids.push(this.students[i].id);
      });

      this.classService.removeStudents(this.id, ids);
    }

    this.hide_delete = e.close;
    this.delete_this = null;

  }

  outsideDialog(e: { target: HTMLInputElement }) {
    if(e.target.id == 'must-close')
      this.hide_delete = true;
  }

}
