import {Component, OnInit} from '@angular/core';
import {Constants} from './models/constants';
import {AuthService} from './services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthenticationResponseDTO, AuthenticationService} from './core/api/be';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = Constants.TITLE_APP;
  isAuth: boolean = false;

  constructor(private authService: AuthService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isAuth = true;
    } else {
      this._login();
    }
  }

  _login() {
    this.authenticationService.getAuthenticationFedera()
      .pipe(map((res: AuthenticationResponseDTO) => {
        return res.token;
      }))
      .subscribe(token => {
        this.authService.setToken({token: token});
        this.isAuth = true;
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

}
