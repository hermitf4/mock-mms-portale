import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserComponent} from './components/user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterInterceptor} from './interceptors/http-inter.interceptor';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HeaderComponent} from './components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {AuthenticationService, BASE_PATH, Configuration, UsersService} from './core/api/be';
import {Constants} from './models/constants';
import {DialogComponent} from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LoginComponent} from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NotFoundComponent,
    HeaderComponent,
    DialogComponent,
    LoginComponent,
    HomeComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterInterceptor, multi: true},
    AuthenticationService, UsersService,
    {provide: BASE_PATH, useValue: Constants.API_URL},
    {provide: Configuration, useFactory: getConfig, multi: false}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/**
 * ApiKeys for Swagger Configuration
 */
export function getConfig(): Configuration {
  return new Configuration({
    apiKeys: {'X-auth': '123'}
  });
}

