import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  datatable: any = [];
  formCliente: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private clienteService:ClienteService
  ) { 
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

  ngOnInit(): void {
    this.onDataTable();
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  onDataTable(){
    this.clienteService.getClientes().subscribe(res => {
      this.datatable = res;
      console.log(res);
    });
  }

  onSaveCliente() {
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

    return cliente;
  }

  onSubmitCliente(){
    this.clienteService.addClientes(this.onSaveCliente()).subscribe(res => {
      if(res){
        this.clearData();
        this.onDataTable();
        alert(`El cliente se ha registrado correctamente`);
      } else{
        alert(`Error en el registro del cliente :(`);
      }
    });
  }

  onSetDataCliente(cliente: Cliente){
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
    this.formCliente.get('descripOtraEnfermedad')?.setValue(cliente.descripOtraEnfermedad);
  }

  onUpdateCliente(){
    let cliente: Cliente = this.onSaveCliente();
    this.clienteService.updateClientes(cliente.idCliente, cliente).subscribe(res => {
      if(res){
        this.clearData();
        this.onDataTable();
        alert(`El cliente ${cliente.nombreCompleto} se ha actualizado correctamente`);
      } else{
        alert(`El cliente ${cliente.nombreCompleto} no se ha actualizado correctamente :(`);
      }
    });
  }

  onDeleteCliente(){
    this.clienteService.deleteClientes( this.formCliente.get('idCliente')?.value ?? 0).subscribe(res => {
      if(res){
        this.clearData();
        this.onDataTable();
        alert(`El cliente se ha eliminado correctamente`);
      } else{
        alert(`El cliente no se ha eliminado correctamente :(`);
      }
    });
  }

  clearData() {
    this.formCliente.reset();
  }

}
