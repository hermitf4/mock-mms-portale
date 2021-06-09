import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {finalize, map} from 'rxjs/operators';
import {UserResponseDTO, UsersService} from '../../core/api/be';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {


  users: any[] = [];
  userLoaded: boolean = false;
  @Input() isAuth = false;

  constructor(private usersService: UsersService) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isAuth) {
      this.usersService.getUsers()
        .pipe(map((res: UserResponseDTO[]) => {
        return res;
      }), finalize(() => this.userLoaded = true))
        .subscribe( users => {
          this.users = users ? users : [];
        });
    }
  }

}
