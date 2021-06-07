import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Constants} from '../models/constants';
import {AuthService} from '../services/auth.service';

@Injectable()
export class HttpInterInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this._addTokenToRequest(request, this.auth.getToken()));
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
}
