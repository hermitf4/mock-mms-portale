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
    username: ''
  };

  constructor(private appService: AppService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.appService.isLoggedChanged.subscribe((user: UserInfo) => {
      this.user.isLogged = user.isLogged;
      this.user.username = user.username
    })
  }

  logout() {
    this.authService.logout();
  }

}
