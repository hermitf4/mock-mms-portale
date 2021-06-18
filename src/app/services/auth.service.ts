import {Injectable} from '@angular/core';
import {Constants} from '../models/constants';
import {AppService} from './app.service';
import {AuthenticationResponseDTO, AuthenticationService, ResponseBaseDTO, UserAuthResponseDTO} from '../core/api/be';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpConstants} from '../models/http-constants';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appService: AppService, private router: Router,
              private authenticationService: AuthenticationService){ }

  checkAuth() {
    if (this.isLoggedIn()) {
      //nav verso le pagine di competenza. Le pagine saranno diverse a seconda del profilo utente
      this.appService.isLoggedChanged.next({isLogged: true, username: this.getUsername()});
      this.appService.navigateToPage('users');
    } else {
      this._authFedera();
    }
  }

  _authFedera() {
    this.authenticationService.getAuthenticationFedera()
      .subscribe((data: AuthenticationResponseDTO) => {
        this._setUserInfoAndRedirect(data.schema);
      }, (err: HttpErrorResponse) => {
        if (err.status === HttpConstants.notAuthorized && err.error.resultCode === Constants.TOKEN_NOT_FOUND_CODE_ERR) {
          this.appService.navigateToPage('login');
        } else {
          this.appService.federaErrorPageRedirect();
        }
      });
  }

  authLDAP(username: string, password: string) {
    this.authenticationService.getAuthenticationLDAP( {
      username,
      password
    }).subscribe((res: AuthenticationResponseDTO) => {
      this._setUserInfoAndRedirect(res.schema);
    })
  }

  _setUserInfoAndRedirect(userInfo: UserAuthResponseDTO | undefined) {
    if (userInfo) {
      const token: string|undefined = userInfo.token;
      const username: string|undefined = userInfo.codiceFiscale;
      this.setToken(token);
      this.setUsername(username);
      this.appService.isLoggedChanged.next({isLogged: true, username: userInfo.codiceFiscale});
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

  getUsername(): string | null {
    return localStorage.getItem(Constants.USERNAME) !== null ? localStorage.getItem(Constants.USERNAME) : '';
  }

  setUsername(username: string | undefined) {
    if(username) {
      localStorage.setItem(Constants.USERNAME, username);
    }
  }

  logout() {
    this.authenticationService.logout().subscribe((resp: ResponseBaseDTO) => {
      this.appService.cleanLS();
      this.appService.isLoggedChanged.next({isLogged:false, username:''});
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
