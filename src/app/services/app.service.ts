import {Injectable, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../models/constants';
import {BehaviorSubject} from 'rxjs';
import {UserInfo} from '../models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy{

  public isLoggedChanged: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>({isLogged: false});

  public loadUsers: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private router: Router) {
  }

  externalLoginRedirect() {
    this.federaLoginRedirect();
  }

  federaLoginRedirect() {
    const urlToRedirect = //window.location.origin
      Constants.BASE_URL_FEDERA + Constants.FEDERA_LOGIN_URL + Constants.APP;
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
      Constants.BASE_URL_FEDERA + Constants.FEDERA_LOGOUT_URL;
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
    if (page === 'users') {
      this.loadUsers.next(true);
    }
  }

  cleanLS() {
    localStorage.clear();
  }

  ngOnDestroy(): void {
    // this.isLoggedChanged.unsubscribe();
    // this.loadUsers.unsubscribe();
  }

}
