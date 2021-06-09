import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserComponent} from './components/user/user.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterInterceptor} from './interceptors/http-inter.interceptor';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HeaderComponent} from './components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {AuthenticationService, Configuration, TestServiceService, UsersService} from './core/api/be';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterInterceptor, multi: true},
    AuthenticationService, UsersService,
    {provide: Configuration, useFactory: getConfig, multi: false}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/**
 * ApiKeys for Swagger Configuration
 */
export function getConfig() {
  return new Configuration({
    apiKeys: {'X-auth': '123'}
  });
}

