import {Component} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {UsersService} from '../../core/api/be';
import {AuthService} from '../../services/auth.service';
import {AppService} from '../../services/app.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {


  users: any[] = [];
  userLoaded = false;

  constructor(private usersService: UsersService, private authService: AuthService, private appService: AppService, private router: Router) {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        if (this.authService.isLoggedIn() && this.users.length === 0) {
          this.getUsers();
        }
      }
    });
  }

  getUsers (): void {
    this.userLoaded = false;
    this.users = [];
    this.usersService.getUsers()
      .pipe(finalize(() => this.userLoaded = true))
      .subscribe( users => {
        this.users = users ? users : [];
      });
  }

}
