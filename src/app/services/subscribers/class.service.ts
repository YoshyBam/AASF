import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//services
import { authService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class classService {

    createClassSubject = new Subject<any>();
    getAllClassesSubject = new Subject<any>();

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


}