import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrl: './create-cliente.component.css'
})
export class CreateClienteComponent {
  formCliente: FormGroup;

  constructor(private clienteService:ClienteService, private router: Router) {
    this.formCliente = new FormGroup({
      idCliente: new FormControl(''),
      nombreCompleto: new FormControl(''),
      identificacion: new FormControl(''),
      edad: new FormControl(''),
      genero: new FormControl(),
      estado: new FormControl(),
      maneja: new FormControl(),
      usaLentes: new FormControl(),
      diabetico: new FormControl(),
      otraEnfermedad: new FormControl(),
      descripOtraEnfermedad: new FormControl(),
    });
  }

  onSubmitCliente(){
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
      descripOtraEnfermedad: this.formCliente.get('descripOtraEnfermedad')?.value ?? ''
    };

    this.clienteService.addClientes(cliente).subscribe(res => {
      if(res){
        alert(`El cliente se ha registrado correctamente`);
        this.router.navigate(['/show']);
      } else{
        alert(`Error en el registro del cliente :(`);
      }
    });
  }
}
