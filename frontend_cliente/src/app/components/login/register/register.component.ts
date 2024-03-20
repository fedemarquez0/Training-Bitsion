import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formReg: FormGroup;
  loading$ = this.userService.loading$;

  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  signup() {
    this.userService
      .register(this.formReg.value)
      .then((response) => {
        console.log(response);
        this.userService.logout();
        this.router.navigate(['/login']);
        this.notification.create(
          'success',
          'Registro exitoso',
          'El usuario ha sido registrado con exito.'
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          this.notification.create(
            'error',
            'Error al registrar',
            'El correo ya esta en uso.'
          );
        } else if (error.code === 'auth/invalid-email') {
          this.notification.create(
            'error',
            'Error al registrar',
            'El correo no es valido.'
          );
        } else if (error.code === 'auth/weak-password') {
          this.notification.create(
            'error',
            'Error al registrar',
            'La contraseña debe tener al menos 6 caracteres.'
          );
        } else if (error.code === 'auth/missing-email') {
          this.notification.create(
            'error',
            'Error al registrar',
            'El correo es requerido.'
          );
        } else if (error.code === 'auth/missing-password') {
          this.notification.create(
            'error',
            'Error al registrar',
            'La contraseña es requerida.'
          );
        } else {
          this.notification.create(
            'error',
            'Error al registrar',
            'Error desconocido.'
          );
        }
      });
  }
}
