import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrl: './edit-cliente.component.css'
})
export class EditClienteComponent {
  formCliente: FormGroup;
  cliente: Cliente = new Cliente();
  @Input() id: number = 0;

  constructor(private clienteService:ClienteService, private router: Router, private route: ActivatedRoute) {
    
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
    this.clienteService.searchClienteId(this.id).subscribe((response: any) => {
      const clienteData = response as Array<Cliente>;
      this.cliente = clienteData[0];
      this.onSetDataCliente(this.cliente);
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

    this.clienteService.updateClientes(cliente.idCliente, cliente).subscribe(res => {
      if(res){
        alert(`El cliente ${cliente.nombreCompleto} se ha actualizado correctamente`);
        this.router.navigate(['/show']);
      } else{
        alert(`El cliente ${cliente.nombreCompleto} no se ha actualizado correctamente :(`);
      }
    });
  }
}
