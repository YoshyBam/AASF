import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { authService } from '../auth.service';
import { Lecture } from 'src/app/models/lecture.interface';

@Injectable()
export class lectureService {

    constructor(private auth: authService, private http: HttpClient) {}

    getLecturesSubject = new Subject<any>();
    checkInSubject = new Subject<any>();
    startLectureSubject = new Subject<any>();

    getLectures(class_id: string) {

        this.http.get(this.auth.key+"classes/"+class_id+"/lectures").subscribe({
            next: (res) => { this.getLecturesSubject.next(<Array<Lecture>>res); },
            error:  (e) => { this.getLecturesSubject.next(e); }
        });
        
    }

    startLecture(class_id: string, date: { start, end }) {
        this.http.post(this.auth.key+"/classes/"+class_id+"/lectures", {
            endTime: date.end,
            startTime: date.start
        }).subscribe({
            next: (res) => { this.startLectureSubject.next(res); },
            error:  (e) => { this.startLectureSubject.next(e); }
        });
    }

    checkIn(code: string) {

        this.http.post(this.auth.key+"/lectures/checkin", {}, {
            params: {
                code: code,
                student: this.auth.user.id.toString()
            } 
        }).subscribe({
            next: (res) => { this.checkInSubject.next(<{ message: string }>res); },
            error:  (e) => { this.checkInSubject.next(e); }
        });

    }

}