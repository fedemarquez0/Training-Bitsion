import { Component } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-cliente',
  templateUrl: './show-cliente.component.html',
  styleUrl: './show-cliente.component.css'
})
export class ShowClienteComponent {
  datatable: any = [];
  searchText: string = '';

  constructor(private clienteService:ClienteService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.onDataTable();
  }

  onClickLogout() {
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

  deleteCliente(id: number){
    this.clienteService.deleteClientes(id).subscribe(res => {
      if(res){
        this.onDataTable();
        alert(`El cliente se ha eliminado correctamente`);
      } else{
        alert(`El cliente no se ha eliminado correctamente :(`);
      }
    });
  }

  searchCliente(){
    this.clienteService.searchCliente(this.searchText).subscribe(res => {
      this.datatable = res;
      console.log(res);
    });
  }
}
