import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {UsersService} from '../../core/api/be';
import {AuthService} from '../../services/auth.service';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  users: any[] = [];
  userLoaded: boolean = false;

  constructor(private usersService: UsersService, private authService: AuthService, private appService: AppService) {

  }

  ngOnInit() {
    console.log('init user');
    this.appService.loadUsers.subscribe((data) => {
          if (data && this.authService.isLoggedIn()) {
            console.log('users retrieve');
            this.getUsers();
          }
    });
  }

  getUsers () {
    this.userLoaded = false;
    this.users = [];
    this.usersService.getUsers()
      .pipe(finalize(() => this.userLoaded = true))
      .subscribe( users => {
        this.users = users ? users : [];
      });
  }

}
