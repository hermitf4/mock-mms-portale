import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Constants} from '../models/constants';
import {AuthService} from '../services/auth.service';
import {catchError} from 'rxjs/operators';
import {HttpConstants} from '../models/http-constants';

@Injectable()
export class HttpInterInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this._addTokenToRequest(request, this.auth.getToken())).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === HttpConstants.notAuthorized ) {
          this._handleTokenExpired(err);
        }
        return throwError(err);
      }));;
  }

  _addTokenToRequest(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: {
          [Constants.jwtHeader]: 'Bearer ' + token
        }
      });
    } else {
      return request;
    }

  }

  _handleTokenExpired(resp: HttpErrorResponse) {
    localStorage.clear();

  }
}
