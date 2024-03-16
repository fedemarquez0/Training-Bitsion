import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrincipalComponent } from './principal/principal.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp({"projectId":"clientes-auth","appId":"1:56091919650:web:e58a225ccd95688b9b517b","storageBucket":"clientes-auth.appspot.com","apiKey":"AIzaSyBrK77GthY3PjxhQV-hz9nZPCoe8dD1GGs","authDomain":"clientes-auth.firebaseapp.com","messagingSenderId":"56091919650"})),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
