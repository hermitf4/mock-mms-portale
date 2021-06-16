import {Component, OnInit} from '@angular/core';
import {Constants} from './models/constants';
import {AuthService} from './services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthenticationResponseDTO, AuthenticationService} from './core/api/be';
import {HttpConstants} from './models/http-constants';
import {AppService} from './services/app.service';
import {DialogComponent} from './components/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = Constants.TITLE_APP;
  isAuth: boolean = false;

  constructor(private authService: AuthService, private appService: AppService,
              private authenticationService: AuthenticationService, public dialog: MatDialog) {
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
        if (token) {
          this.authService.setToken({token: token});
          this.isAuth = true;
        }
      }, (err: HttpErrorResponse) => {
        if (err.status === HttpConstants.notAuthorized && err.error.resultCode === Constants.TOKEN_NOT_FOUND_CODE_ERR) {
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '26.5rem',
            data: {message: 'Token Federa not found'}});

          dialogRef.afterClosed().subscribe(_ => {
            this.appService.externalLoginRedirect();
          });

        }
      });
  }

}
