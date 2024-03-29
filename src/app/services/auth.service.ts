import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable()
export class authService {
    
    public key = "https://dodgers-aas.herokuapp.com/api/v1/";

    access_token: null;
    refresh_token: null;
    user: User = {
        id: null,
        academic_group_id: null,
        name: null,
        surname: null,
        role: null
    }

    user_login_subject  = new Subject<any>();
    user_create_subject = new Subject<any>();
    user_logout_subject = new Subject<any>(); 

    refreshSessionSubject = new Subject<any>();

    constructor(private http: HttpClient) {

    }

    user_login(email: string, password: string) {
        this.http.post(this.key + 'session', {

            email: email,
            password: password

        }).subscribe({

            next: (res) => { this.user_login_subject.next(<{ tokens: { access_token: string, refresh_token: string }, user: User }>res); },
            error: (e)  => { this.user_login_subject.next(e); }

        });

    }

    user_create(email: string, password: string, confirm_password: string, name: string, surname: string, group: number) {

        this.http.post(this.key + 'users', {

            name: name,
            surname: surname,
            email: email,
            password: password,
            confirm_password: confirm_password,
            academic_group_id: group,

        }).subscribe({

            next: (res) => { this.user_create_subject.next(<{createdAt: string, email: string, id: number, name: string, surname: string, role: string, status: string, updatedAt: string }>res); },
            error: (e)  => { this.user_create_subject.next(e); }

        });


    }

    user_logout() {

        this.http.delete(this.key + 'session', {}).subscribe({

            next: (res) => { this.user_logout_subject.next(res); },
            error: (e)  => { this.user_logout_subject.next(e); }

        });

    }

    refreshSession(token: string) {

        this.http.post(this.key + "session/refresh", {

            refresh_token: token

        }).subscribe( {

            next: (res) => { this.refreshSessionSubject.next(<{ tokens: { access_token: string, refresh_token: string }, user: User }>res) },
            error:  (e) => { this.refreshSessionSubject.next(e); }

        });

    }



}