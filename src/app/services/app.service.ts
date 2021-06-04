import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router) { }


  externalLoginRedirect() {
    this._ciamLoginRedirect();
  }

  externalLogoutRedirect() {
    localStorage.clear();
    this._ciamLogoutRedirect();
  }

  _ciamLoginRedirect() {
    const currentApp = 'USER';
    const urlToRedirect = window.location.origin + Constants.FEDERA_LOGIN_URL + currentApp.toUpperCase();
    window.location.href = urlToRedirect;
  }


  _ciamLogoutRedirect() {
    const urlToRedirect = window.location.origin + Constants.FEDERA_LOGOUT_URL;
    window.location.href = urlToRedirect;
  }

  ciamErrorPageRedirect() {
    const urlToRedirect = window.location.origin;
    window.location.href = urlToRedirect;
  }

  errorPageRedirect() {
    this.router.navigate(['access-denied']);
  }


}
