import { AuthGuardService } from './../../core/auth-guard.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthGuardService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        console.log('event =>', event);
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      })
    );
  }
}
