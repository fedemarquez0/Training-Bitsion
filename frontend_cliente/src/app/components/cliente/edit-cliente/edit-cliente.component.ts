import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrl: './edit-cliente.component.css',
})
export class EditClienteComponent {
  formCliente: FormGroup;
  cliente: Cliente = new Cliente();
  @Input() id: number = 0;
  checkEnfermedad: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
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

  ngOnInit(): void {
    this.clienteService.searchClienteId(this.id).subscribe((response: any) => {
      const clienteData = response as Array<Cliente>;
      this.cliente = clienteData[0];
      this.onSetDataCliente(this.cliente);
    });
  }

  onSetDataCliente(cliente: Cliente) {
    this.formCliente.get('idCliente')?.setValue(cliente.idCliente);
    this.formCliente.get('nombreCompleto')?.setValue(cliente.nombreCompleto);
    this.formCliente.get('identificacion')?.setValue(cliente.identificacion);
    this.formCliente.get('edad')?.setValue(cliente.edad);
    this.formCliente.get('genero')?.setValue(cliente.genero);
    this.formCliente.get('estado')?.setValue(cliente.estado);
    this.formCliente.get('maneja')?.setValue(cliente.maneja);
    this.formCliente.get('usaLentes')?.setValue(cliente.usaLentes);
    this.formCliente.get('diabetico')?.setValue(cliente.diabetico);
    this.formCliente.get('otraEnfermedad')?.setValue(cliente.otraEnfermedad);
    this.formCliente
      .get('descripOtraEnfermedad')
      ?.setValue(cliente.descripOtraEnfermedad);
  }

  onUpdateCliente() {
    if (this.formCliente.valid) {
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

      this.clienteService
        .updateClientes(cliente.idCliente, cliente)
        .subscribe((res) => {
          if (res) {
            this.drawerRef.close(cliente);
            this.notification.create(
              'success',
              'Editar cliente',
              'Cliente editado correctamente.'
            );
          } else {
            this.notification.create(
              'error',
              'Editar cliente',
              'Error al editar el cliente, intente mas tarde.'
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
