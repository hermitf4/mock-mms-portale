import {Component, OnInit} from '@angular/core';
import {Constants} from './models/constants';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = Constants.TITLE_APP;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    //this.authService.checkAuth();
  }

}
