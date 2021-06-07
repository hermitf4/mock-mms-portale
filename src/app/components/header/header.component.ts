import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../models/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    // window.location.reload();
    const urlToRedirect = window.location.origin + Constants.FEDERA_LOGOUT_URL;
    window.location.href = urlToRedirect;
  }

}
