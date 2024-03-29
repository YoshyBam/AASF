import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { authService } from 'src/app/services/auth.service';

@Injectable()
export class WithCrededentialsInterceptor implements HttpInterceptor {

    constructor(private readonly authService: authService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(isNullOrUndefined(this.authService.access_token))
            request = request.clone({
                setHeaders: {
                    ContentType:'application/json; charset=utf-8',
                }
            });
        else
            request = request.clone({
                setHeaders: {
                    'authorization': 'Bearer ' + this.authService.access_token,
                    ContentType:'application/json; charset=utf-8',
                }
            });

            
        return next.handle(request);
        
    }

}