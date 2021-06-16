import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router) {
  }


  externalLoginRedirect() {
    this._ciamLoginRedirect();
  }

  externalLogoutRedirect() {
    localStorage.clear();
    this._ciamLogoutRedirect();
  }

  _ciamLoginRedirect() {
    const currentApp = 'mms';
    const urlToRedirect = //window.location.origin
      Constants.BASE_URL_LOCALHOST + Constants.FEDERA_LOGIN_URL + currentApp;
    window.location.href = urlToRedirect;
  }


  _ciamLogoutRedirect() {
    const urlToRedirect = // window.location.origin
      Constants.BASE_URL_LOCALHOST + Constants.FEDERA_LOGOUT_URL;
    window.location.href = urlToRedirect;
  }

  ciamErrorPageRedirect() {
    const urlToRedirect = window.location.origin;
    window.location.href = urlToRedirect;
  }

  errorPageRedirect() {
  }


}
