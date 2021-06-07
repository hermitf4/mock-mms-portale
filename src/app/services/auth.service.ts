import {Injectable} from '@angular/core';
import {Constants} from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): any {
    return localStorage.getItem( Constants.jwtHeader ) !== null && localStorage.getItem( Constants.jwtHeader ) !== '';
  }

  getToken() {
    return localStorage.getItem(Constants.jwtHeader);
  }

  setToken(authentication: any) {
    if (authentication.token) {
      localStorage.setItem(Constants.jwtHeader, authentication.token);
    }

  }

}
