import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { authService } from 'src/app/services/auth.service';
import { isNullOrUndefined } from 'util';
@Injectable()
export class WithCrededentialsInterceptor implements HttpInterceptor {

    constructor(private readonly authService: authService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(isNullOrUndefined(this.authService.user.access_token))
            request = request.clone({
                setHeaders: {
                    ContentType:'application/json; charset=utf-8',
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache'
                },
                withCredentials: true
            });
        else
            request = request.clone({
                setHeaders: {
                    'authorization': 'Bearer ' + this.authService.user.access_token,
                    ContentType:'application/json; charset=utf-8',
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache'
                },
                withCredentials: true
            });

            
        return next.handle(request);
        
    }

}