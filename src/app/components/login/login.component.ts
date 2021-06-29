import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AppService} from '../../services/app.service';
import {AuthenticationService} from '../../core/api/be';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authentication: AuthenticationService,
              private appService: AppService,
              private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], password: ['',  Validators.required]
    });
  }

  ngOnInit(): void {
    this.appService.cleanLS();
    this.appService.isLoggedChanged.next({isLogged: false});
  }

  ngAfterViewInit(): void {
    this.loginForm.reset();
  }

  login(): void {
     const username = this.loginForm.controls['username'].value;
     const password = this.loginForm.controls['password'].value;
     this.authService.authLDAP(username, password);
  }

  federa(): void {
      this.appService.externalLoginRedirect();
  }
}
