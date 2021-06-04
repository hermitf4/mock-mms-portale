import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {finalize, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any[] = [];
  userLoaded: boolean = false;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('https://reqres.in/api/users?').pipe(map((res: any) => {
        return res.data;
    }), finalize(() => this.userLoaded = true))
      .subscribe( data => {
        this.users = data ? data : [];
      });
  };

}
