import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {finalize, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {


  users: any[] = [];
  userLoaded: boolean = false;
  @Input() isAuth = false;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isAuth) {
      this.http.get('https://reqres.in/api/users?').pipe(map((res: any) => {
        return res.data;
      }), finalize(() => this.userLoaded = true))
        .subscribe( data => {
          this.users = data ? data : [];
        });
    }
  }

}
