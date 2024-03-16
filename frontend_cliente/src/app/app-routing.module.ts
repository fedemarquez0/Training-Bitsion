import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/principal'},
  { path: 'principal', component: PrincipalComponent, 
  ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
