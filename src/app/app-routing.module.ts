import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'access-denied', component: AccessDeniedComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
