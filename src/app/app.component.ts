import {Component, OnInit} from '@angular/core';
import {Constants} from './models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = Constants.TITLE_APP;

  constructor() {
  }

  ngOnInit(): void {

  }

  _login() {

  }

}
