import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//services
import { authService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

//interfaces
import { Student } from 'src/app/models/students.interface';
import { Class } from 'src/app/models/class.interface';

@Injectable()
export class classService {

    createClassSubject = new Subject<any>();

    getAllClassesSubject = new Subject<any>();
    getStudentClassesSubject = new Subject<any>();
    getTeacherClassesSubject = new Subject<any>();

    deleteClassSubject = new Subject<any>();

    
    getAllClassStudentsSubject = new Subject<any>();
    removeStudentsSubject = new Subject<any>();
    addStudentSubject = new Subject<any>();

    constructor(private readonly auth: authService, private http: HttpClient) { }

    createClass(name: string, schedule: string) {
        this.http.post(this.auth.key+"/classes", {
            name: name,
            schedule: schedule
        }).subscribe({ //make proper object
            next: (res) => { this.createClassSubject.next(<any>res); },
            error: (e)  => { this.createClassSubject.next(e); }
        })
    }

    getAllClasses() {
        this.http.get(this.auth.key+"classes").subscribe({
            next: (res) => { this.getAllClassesSubject.next(<{}>res);},
            error: (e)  => { this.getAllClassesSubject.next(e); }
        })
    }
    getStudentClasses(student_id: number) {
        this.http.get(this.auth.key + "students/" + student_id + "/classes").subscribe({
            next: (res) => { this.getStudentClassesSubject.next(<Array<Class>>res); },
            error:  (e) => { this.getStudentClassesSubject.next(e); }
        });
    }
    getTeacherClasses(teacher_id: number) {
        this.http.get(this.auth.key + "students/" + teacher_id + "/classes").subscribe({
            next: (res) => { this.getTeacherClassesSubject.next(<Array<Class>>res); },
            error:  (e) => { this.getTeacherClassesSubject.next(e); }
        });
    }

    deleteClass(id: number) {
        this.http.delete(this.auth.key+"classes/"+id).subscribe({
            next: (res) => { this.deleteClassSubject.next(res); },
            error: (e)  => { this.deleteClassSubject.next(e); }
        });
    }

    getAllClassStudents(class_id: number) {
        this.http.get(this.auth.key + "classes/" + class_id.toString() + "/students").subscribe({
            next: (res) => { this.getAllClassStudentsSubject.next(<Array<Student>>res); },
            error: (e)  => { this.getAllClassStudentsSubject.next(e); }
        });
    }
    
    removeStudents(class_id: number, student_ids: Array<number>) {
        this.http.request('delete', this.auth.key + "classes/" + class_id.toString() + "/students", {
            body: { student_ids: student_ids }
        }).subscribe({
            next: (res) => { this.removeStudentsSubject.next(<Array<Student>>res); },
            error: (e)  => { this.removeStudentsSubject.next(e); }
        });
    }
    
    addStudentsToClass(class_id: number, student_ids: Array<number>) {

        this.http.post(this.auth.key + "classes/" + class_id + "/students", {

            student_ids: student_ids

        }).subscribe({
            next: (res) => { this.addStudentSubject.next(<Array<Student>>res); },
            error:  (e) => { this.addStudentSubject.next(e); }
        });

    }


}