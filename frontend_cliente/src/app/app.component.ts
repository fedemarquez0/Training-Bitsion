import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cliente } from './models/cliente';
import { ClienteService } from './services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
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
}
