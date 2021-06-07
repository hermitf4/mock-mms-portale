import {Component, OnInit} from '@angular/core';
import {Constants} from './models/constants';
import {AuthService} from './services/auth.service';
import {HttpClient} from '@angular/common/http';
import {finalize, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = Constants.TITLE_APP;
  isAuth: boolean = false;

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
      if (this.authService.isLoggedIn()) {
        this.isAuth = true;
      } else {
        // fake auth
        this.http.post('https://reqres.in/api/register',
          {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
          })
          .pipe(map((res: any) => {
          return res.token;
        }))
          .subscribe( token => {
            this.authService.setToken({token: token});
            this.isAuth = true;
          });
      }
  }

  _login() {

  }

}
