import {Injectable} from '@angular/core';
import {Constants} from '../models/constants';
import {AppService} from './app.service';
import {AuthenticationResponseDTO, AuthenticationService, ResponseBaseDTO, UserAuthResponseDTO} from '../core/api/be';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpConstants} from '../models/http-constants';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appService: AppService, private router: Router, public dialog: MatDialog,
              private authenticationService: AuthenticationService){ }

  checkAuth() {
    if (this.isLoggedIn()) {
      //nav verso le pagine di competenza. Le pagine saranno diverse a seconda del profilo utente

      this.appService.isLoggedChanged.next({isLogged: true, user: this.getUserInfo()});
      this.appService.navigateToPage('users');
    } else {
      this._verifyAuthentication();
    }
  }

  _verifyAuthentication() {
    this.authenticationService.getAuthentication()
      .subscribe((data: AuthenticationResponseDTO) => {
        if (data.success) {
          this._setUserInfoAndRedirect(data.schema);
        }
      }, (err: HttpErrorResponse) => {
        if (err.status === HttpConstants.notAuthorized && err.error.resultCode === Constants.TOKEN_NOT_FOUND_CODE_ERR) {
          this.appService.navigateToPage('login');
        } else {
          this.appService.errorPageRedirect();
        }
      });
  }

  loginLDAP(username: string, password: string) {
    this.authenticationService.loginLDAP( {
      username,
      password
    }).subscribe((res: AuthenticationResponseDTO) => {
      if (res.success) {
        this._setUserInfoAndRedirect(res.schema);
      } else {
        this.dialog.open(DialogComponent, {width: '26.5rem', data: {message: res.message}});
        return;
      }

    }, (err: HttpErrorResponse) => {
        this.dialog.open(DialogComponent, {width: '26.5rem', data: {message: 'Errore Server'}});
    })
  }

  _setUserInfoAndRedirect(userInfo: UserAuthResponseDTO | undefined) {
    if (userInfo) {
      const token: string|undefined = userInfo.token;
      const user: any = {
        username: userInfo.codiceFiscale,
        firstname: userInfo.nome,
        lastname: userInfo.cognome
      };
      this.setToken(token);
      this.setUserInfo(user);
      this.appService.isLoggedChanged.next({isLogged: true, user: user});
      this.appService.navigateToPage('users');
    }
  }

  isLoggedIn(): any {
    return localStorage.getItem( Constants.JWTHEADER ) !== null && localStorage.getItem( Constants.JWTHEADER ) !== '';
  }

  getToken() {
    return localStorage.getItem(Constants.JWTHEADER);
  }

  setToken(token: string | undefined) {
    if (token) {
      localStorage.setItem(Constants.JWTHEADER, token);
    }
  }

  getUserInfo(): any {
    return localStorage.getItem(Constants.USER) !== null ? JSON.parse(<string>localStorage.getItem(Constants.USER)) : {};
  }

  setUserInfo(user: any) {
    if(user) {
      localStorage.setItem(Constants.USER, JSON.stringify(user));
    }
  }

  logout() {
    this.authenticationService.logout().subscribe((resp: ResponseBaseDTO) => {
      this.appService.cleanLS();
      this.appService.isLoggedChanged.next({isLogged:false, user: {}});
      switch (resp.resultCode) {
        case Constants.CODE_LOGOUT_LDAP:
          this.appService.navigateToPage('login');
          break;
        case Constants.CODE_LOGOUT_FEDERA:
          this.appService.externalLogoutRedirect();
          break;
        default:
          break;
      }

    })
  }

}
