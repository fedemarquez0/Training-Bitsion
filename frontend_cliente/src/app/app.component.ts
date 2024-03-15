import { Component } from '@angular/core';
import { Cliente } from './models/cliente';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cliente:Cliente = new Cliente();
  datatable: any = [];

  constructor(private clienteService:ClienteService){}

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable(){
    this.clienteService.getClientes().subscribe(res => {
      this.datatable = res;
      console.log(res);
    });
  }

  onSetData(select:any){
    this.cliente.id = select.idCliente;
    this.cliente.nombreCompleto = select.nombreCompleto;
    this.cliente.identificacion = select.identificacion;
    this.cliente.edad = select.edad;
    this.cliente.genero = select.genero;
    this.cliente.estado = select.estado;
    this.cliente.maneja = select.maneja;
    this.cliente.usaLentes = select.usaLentes;
    this.cliente.diabetico = select.diabetico;
    this.cliente.otraEnfermedad = select.otraEnfermedad;
    this.cliente.descripOtraEnfermedad = select.descripOtraEnfermedad;
  }

  onAddData(cliente:Cliente):void{
    this.clienteService.addClientes(cliente).subscribe(res => {
      if(res){
        this.clearData();
        this.onDataTable();
        alert(`El cliente ${cliente.nombreCompleto} se ha registrado correctamente`);
      } else{
        alert(`El cliente ${cliente.nombreCompleto} no se ha registrado correctamente :(`);
      }
    });
  }

  onUpdateData(cliente:Cliente):void{
    this.clienteService.updateClientes(cliente.id, cliente).subscribe(res => {
      if(res){
        this.clearData();
        this.onDataTable();
        alert(`El cliente ${cliente.nombreCompleto} se ha actualizado correctamente`);
      } else{
        alert(`El cliente ${cliente.nombreCompleto} no se ha actualizado correctamente :(`);
      }
    });
  }

  onDeleteData(id:number):void{
    this.clienteService.deleteClientes(id).subscribe(res => {
      if(res){
        this.onDataTable();
        alert(`El cliente se ha eliminado correctamente`);
      } else{
        alert(`El cliente no se ha eliminado correctamente :(`);
      }
    });
  }

  clearData(){
    this.cliente.id = 0;
    this.cliente.nombreCompleto = '';
    this.cliente.identificacion = '';
    this.cliente.edad = 0;
    this.cliente.genero = '';
    this.cliente.estado = '';
    this.cliente.maneja = false;
    this.cliente.usaLentes = false;
    this.cliente.diabetico = false;
    this.cliente.otraEnfermedad = false;
    this.cliente.descripOtraEnfermedad = '';
  }
}
