import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { classService } from 'src/app/services/subscribers/class.service';

///interfaces
import { Student } from 'src/app/models/students.interface';
import { authService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-students',
  templateUrl: 'students.component.html',
  styleUrls: ['students.component.scss']
})
export class AttendanceComponent implements OnInit, OnDestroy {

  students: Array<Student>;
  selectStudent: Array<boolean>;
  id: number


  deleteStudentsSubscription: Subscription;
  getAllStudentsSubscription: Subscription;


  constructor(private auth: authService, private classService: classService, private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
      this.id = params['class'];
    });

    this.selectStudent = new Array<boolean>()
    switch(this.auth.user.role) {
      case "admin" :
        this.classService.getAllClassStudents(this.id);
        break;
      case "teacher" :
        this.classService.getAllClassStudents(this.id);
        break;
    }
    
  }

  ngOnInit() {

    this.deleteStudentsSubscription = this.classService.removeStudentsSubject.subscribe({
      next: (res) => {
        if(isNullOrUndefined(res.error)) {
        
          this.classService.getAllClassStudents(this.id);

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
    if(this.deleteStudentsSubscription)
      this.deleteStudentsSubscription.unsubscribe();
    if(this.getAllStudentsSubscription)
      this.getAllStudentsSubscription.unsubscribe();
  }

  deleteStudents() {
    this.delete_this = new Array<number>();

    for(let i = 0; i < this.students.length; i++)
      if(this.selectStudent[i])
        this.delete_this.push(this.students[i].id);
    this.hide_delete = false;

    console.log("delete", this.delete_this);

  }
  

  //for hiding the add branch component
  hide_delete = true;
  delete_this: Array<number> = null;
  responseDialog(e: { close: boolean, output: string, index: Array<number> }) { 
    this.hide_delete = e.close;
    console.log(e);
    
    if(e.output == "true") {
      let ids = new Array<number>();

      e.index.forEach(i => ids.push(i));

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
