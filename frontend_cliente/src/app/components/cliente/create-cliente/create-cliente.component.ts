import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrl: './create-cliente.component.css',
})
export class CreateClienteComponent {
  formCliente: FormGroup;
  checkEnfermedad: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private drawerRef: NzDrawerRef<string>,
    private notification: NzNotificationService
  ) {
    this.formCliente = new FormGroup({
      idCliente: new FormControl(''),
      nombreCompleto: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
      identificacion: new FormControl('', [ Validators.required, Validators.maxLength(20) ]),
      edad: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      maneja: new FormControl(),
      usaLentes: new FormControl(),
      diabetico: new FormControl(),
      otraEnfermedad: new FormControl(),
      descripOtraEnfermedad: new FormControl(),
    });
  }

  onSubmitCliente() {
    if (this.formCliente.valid) {
      //creamos un cliente con los datos del formulario
      let cliente: Cliente = {
        idCliente: this.formCliente.get('idCliente')?.value ?? 0,
        nombreCompleto: this.formCliente.get('nombreCompleto')?.value ?? '',
        identificacion: this.formCliente.get('identificacion')?.value ?? '',
        edad: this.formCliente.get('edad')?.value ?? '',
        genero: this.formCliente.get('genero')?.value ?? '',
        estado: this.formCliente.get('estado')?.value ?? '',
        maneja: this.formCliente.get('maneja')?.value ?? false,
        usaLentes: this.formCliente.get('usaLentes')?.value ?? false,
        diabetico: this.formCliente.get('diabetico')?.value ?? false,
        otraEnfermedad: this.formCliente.get('otraEnfermedad')?.value ?? false,
        descripOtraEnfermedad:
          this.formCliente.get('descripOtraEnfermedad')?.value ?? '',
      };

      this.clienteService.addClientes(cliente).subscribe((res) => {
        if (res) {
          this.drawerRef.close(cliente);
          this.notification.create(
            'success',
            'Registro de cliente',
            'Cliente registrado correctamente.'
          );
        } else {
          this.notification.create(
            'error',
            'Registro de cliente',
            'Error al registrar cliente, intente mas tarde.'
          );
        }
      });
    } else {
      Object.values(this.formCliente.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      });
    }
  }

  checkboxEnfermedad() {
    if (this.checkEnfermedad) {
      //si el checkbox esta seleccionado, se habilita el campo descripOtraEnfermedad
      this.formCliente.get('descripOtraEnfermedad')?.enable();
    } else {
      //si el checkbox no esta seleccionado, se deshabilita el campo descripOtraEnfermedad
      this.formCliente.get('descripOtraEnfermedad')?.setValue('');
      this.formCliente.get('descripOtraEnfermedad')?.disable();
    }
  }
}
