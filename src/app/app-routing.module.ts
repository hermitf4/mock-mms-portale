import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
import {UserComponent} from './components/user/user.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';
import {LogoutDefaultPageComponent} from './components/logout-default-page/logout-default-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'users', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'access-denied', component: AccessDeniedComponent},
  {path: 'default-logout', component: LogoutDefaultPageComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
