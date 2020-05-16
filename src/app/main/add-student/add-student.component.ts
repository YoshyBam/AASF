import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined, isNull } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { classService } from 'src/app/services/subscribers/class.service';
import { studentService } from 'src/app/services/subscribers/student.service';

//interfaces
import { Student } from 'src/app/models/students.interface';

//interfaces

@Component({
  selector: 'app-add-student',
  templateUrl: 'add-student.component.html',
  styleUrls: ['add-student.component.scss']
})
export class AddStudentComponent implements OnInit, OnDestroy{

  getStudentListSubscription: Subscription;
  getAcademicGroupListSubscription: Subscription;
  getStudentsFromGroupSubscription: Subscription;

  addStudentsSubscription: Subscription;

  id: number;

  groups: Array<{id: number, name: string}>;
  selectedGroup: number = null;
  students: Array<Student>;
  selectedStudent: number = null;


  

  

  constructor(private student: studentService, private classesService: classService, private router: Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.id = params['class'];
    });

    this.student.getStudentList();
    this.student.getGroupList();
  }

  ngOnInit() {
    this.getStudentListSubscription = this.student.getStudentListSubject.subscribe({
      next: (res) => {

        if(isNullOrUndefined(res.error)) {

          console.log(res);
          this.students = res;

        } else {
          console.log(res);
        }

      }
    });
    this.getAcademicGroupListSubscription = this.student.getAcademicGroupListSubject.subscribe({
      next: (res) => {

        if(isNullOrUndefined(res.error)) {

          console.log(res);
          this.groups = res;

        } else {

          console.log(res);

        }

      }
    });
    this.getStudentsFromGroupSubscription = this.student.getStudentsFromGroupSubject.subscribe({
      next: (res) => {

        if(isNullOrUndefined(res.error)) {

          console.log(res);
          this.addGroupOfStudents(res);

        } else {
          
          console.log(res);
          this.selectedGroup = null;
          this.selectedStudent = null;

        }

      }
    });

    this.addStudentsSubscription = this.classesService.addStudentSubject.subscribe({
      next: (res) => {
        
        if(isNullOrUndefined(res.error)) {

          console.log(res);
          this.router.navigate(['/classes/single', { queryParams: { class: this.id } }]);

        } else {

          console.log(res);
          this.selectedGroup = null;
          this.selectedStudent = null;

        }

      }
    });
    
  }

  ngOnDestroy() {

    this.getStudentListSubscription.unsubscribe();
    this.getAcademicGroupListSubscription.unsubscribe();
    this.getStudentsFromGroupSubscription.unsubscribe();
    this.addStudentsSubscription.unsubscribe();

  }

  validator() {
    if(this.selectedGroup != null && this.selectedGroup.toString() == "null") this.selectedGroup = null;
    if(this.selectedStudent != null && this.selectedStudent.toString() == "null") this.selectedStudent = null;
  }
  addGroupOfStudents(response: Array<Student>) {

    let student_ids = new Array<number>();
    response.forEach(s => {
      student_ids.push(s.id);
    });

    this.classesService.addStudentsToClass(this.id, student_ids);

  }

  submit() {
    if(this.selectedGroup) {

      this.student.getStudentsFromGroup(this.groups[this.selectedGroup].id);

    } else {

      this.classesService.addStudentsToClass(this.id, [this.students[this.selectedStudent].id]);

    }
  }

}
