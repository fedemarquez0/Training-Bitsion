import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/login/register/register.component';
import { LoginComponent } from './components/login/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ShowClienteComponent } from './components/cliente/show-cliente/show-cliente.component';
import { CreateClienteComponent } from './components/cliente/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/cliente/edit-cliente/edit-cliente.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/show'},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'show', component: ShowClienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: 'create', component: CreateClienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: 'edit/:id', component: EditClienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
