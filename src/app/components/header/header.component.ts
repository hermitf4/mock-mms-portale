import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../models/constants';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.appService.externalLogoutRedirect();
  }

}
