import {Injectable, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../models/constants';
import {BehaviorSubject} from 'rxjs';
import {UserInfo} from '../models/UserInfo';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public isLoggedChanged: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>({isLogged: false});

  constructor(private router: Router) {
  }

  externalLoginRedirect() {
    this.federaLoginRedirect();
  }

  federaLoginRedirect() {
    const urlToRedirect = //window.location.origin
      Constants.BASE_URL_FEDERA + Constants.FEDERA_LOGIN_URL + '?' + Constants.FEDERA_PARAM + environment.idApp;
    window.location.href = urlToRedirect;
  }

  logoutPageRedirect() {
    this.cleanLS();
    this.navigateToPage('');
  }

  externalLogoutRedirect() {
    this.cleanLS();
    this.federaLogoutRedirect();
  }

  federaLogoutRedirect() {
    const urlToRedirect = // window.location.origin
      Constants.BASE_URL_FEDERA + Constants.FEDERA_LOGOUT_URL + '?' + Constants.FEDERA_PARAM + environment.idApp;
    window.location.href = urlToRedirect;
  }

  federaErrorPageRedirect() {
    const urlToRedirect = Constants.BASE_URL_FEDERA;// window.location.origin;
    window.location.href = urlToRedirect;
  }

  errorPageRedirect() {
    this.navigateToPage('access-denied');
  }

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }

  cleanLS() {
    localStorage.clear();
  }


}
