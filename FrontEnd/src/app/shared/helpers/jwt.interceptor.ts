import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '@angular/compiler';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add authorization header with jwt token if available
        

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
       
        if (currentUser) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.Token}`,
                    "Content-Type": "application/json; charset=utf-8",
                    //Content: application/json,
                }
                // headers: new HttpHeaders({
                //     'Content-Type':  'application/json',
                //     'Authorization': 'Bearer ${currentUser.Token}'
                //   })
            });      
        //request.headers.set('Content-Type', 'application/json');
        }

        return next.handle(request);
    }
}

export let jwtProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
};