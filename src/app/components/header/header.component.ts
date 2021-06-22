import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {AuthService} from '../../services/auth.service';
import {UserInfo} from '../../models/UserInfo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Input() title = '';
  user: any = {
    isLogged: false,
    username: '',
    firstname:'',
    lastname: ''
  };
  userInfoArray: any[] = [];

  constructor(private appService: AppService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.appService.isLoggedChanged.subscribe((userInfo: UserInfo) => {
      this.userInfoArray = [];
      this.user.isLogged = userInfo.isLogged;
      if (this.user.isLogged && userInfo.user) {
        this.user.username = userInfo.user.username;
        this.userInfoArray.push(`CF: ${this.user.username}`);
        if (userInfo.user.firstname ) {
          this.user.firstname = userInfo.user.firstname;
          this.userInfoArray.push(`NOME: ${(this.user.firstname).toUpperCase()}`);
        }
        if (userInfo.user.lastname ) {
          this.user.lastname = userInfo.user.lastname;
          this.userInfoArray.push(`COGNOME: ${(this.user.lastname).toUpperCase()}`);
        }
      }

    })
  }

  logout() {
    this.authService.logout();
  }

}
