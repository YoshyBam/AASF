import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//services
import { authService } from '../auth.service';

//interfaces
import { Student } from 'src/app/models/students.interface';

@Injectable()
export class studentService {

    getStudentListSubject = new Subject<any>();
    getAcademicGroupListSubject = new Subject<any>();
    getStudentsFromGroupSubject = new Subject<any>();

    constructor(private readonly auth: authService, private http: HttpClient) { }

    getStudentList() {
        this.http.get(this.auth.key + "students").subscribe({
            next: (res) => { this.getStudentListSubject.next(<Array<Student>>res); },
            error:  (e) => { this.getStudentListSubject.next(e); }
        });
    }
    getGroupList() {
        this.http.get(this.auth.key + "academic-groups").subscribe({
            next: (res) => { this.getAcademicGroupListSubject.next(<Array<{id: number, name: string }>>res); },
            error:  (e) => { this.getAcademicGroupListSubject.next(e); }
        });
    }
    getStudentsFromGroup(group_id: number) {
        this.http.get(this.auth.key + "academic-groups/" + group_id + "/students").subscribe({
            next: (res) => { this.getStudentsFromGroupSubject.next(<Array<Student>>res); },
            error:  (e) => { this.getStudentsFromGroupSubject.next(e); }
        });
    }


}