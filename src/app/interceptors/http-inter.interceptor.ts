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
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../components/dialog/dialog.component';
import {AppService} from '../services/app.service';

@Injectable()
export class HttpInterInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, public dialog: MatDialog, private appService: AppService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this._addTokenToRequest(request, this.auth.getToken())).pipe(
      catchError(err => {
        if (this._isApiError(err)) {
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

  _isApiError(err: HttpErrorResponse) {
    return err instanceof HttpErrorResponse &&
      err.status === HttpConstants.notAuthorized &&
      err.error.resultCode !== Constants.TOKEN_NOT_FOUND_CODE_ERR;
  }

  _handleTokenExpired(resp: HttpErrorResponse) {
    const dialogRef = this.dialog.open(DialogComponent, {width: '26.5rem', data: {message: 'Token non valido'}});

    dialogRef.afterClosed().subscribe(result => {
      this.appService.externalLogoutRedirect();
    });

  }
}
