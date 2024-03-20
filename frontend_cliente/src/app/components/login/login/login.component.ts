import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formLogin: FormGroup;
  loading$ = this.userService.loading$;

  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((response) => {
        console.log(response);
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          this.notification.create(
            'error',
            'Error al ingresar',
            'El correo no es valido.'
          );
        } else if (error.code === 'auth/invalid-credential') {
          this.notification.create(
            'error',
            'Error al ingresar',
            'Las credenciales no son validas.'
          );
        } else if (error.code === 'auth/missing-password') {
          this.notification.create(
            'error',
            'Error al ingresar',
            'La contraseña es requerida.'
          );
        } else {
          this.notification.create(
            'error',
            'Error al ingresar',
            'Error desconocido.'
          );
        }
      });
  }

  onClick() {
    this.userService
      .loginWithGoogle()
      .then((response) => {
        console.log(response);
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.log(error);
        this.notification.create(
          'error',
          'Error al ingresar',
          'Error al intentar ingresar con Google.'
        );
      });
  }
}
