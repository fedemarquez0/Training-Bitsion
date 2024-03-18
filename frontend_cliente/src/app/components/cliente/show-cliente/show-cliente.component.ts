import { Component } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { EditClienteComponent } from '../edit-cliente/edit-cliente.component';
import { CreateClienteComponent } from '../create-cliente/create-cliente.component';

@Component({
  selector: 'app-show-cliente',
  templateUrl: './show-cliente.component.html',
  styleUrl: './show-cliente.component.css'
})
export class ShowClienteComponent {
  datatable: any = [];
  searchText: string = '';
  loading$ = this.clienteService.loading$;

  constructor(private clienteService:ClienteService, private userService: UserService, private router: Router, private modal: NzModalService,private notification: NzNotificationService, private drawerService: NzDrawerService) { }

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
    this.clienteService.getClientes().then(res => {
      this.datatable = res;
      console.log(res);
    });
  }

  deleteCliente(id: number){
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.clienteService.deleteClientes(id).subscribe(res => {
          if(res){
            this.onDataTable();
            this.notification.create(
              'success',
              'Notification Title',
              'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
            );
          } else{
            this.notification.create(
              'error',
              'Notification Title',
              'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
            );
          }
        });
      },
      nzCancelText: 'No',
      nzOnCancel: () => {return;}
    });

  }

  searchCliente(){
    this.clienteService.searchCliente(this.searchText).then(res => {
      this.datatable = res;
      console.log(res);
    });
  }

  openDrawerEdit(id: number): void {
    this.drawerService.create({
      nzTitle: 'Editar Cliente',
      nzContent: EditClienteComponent,
      nzContentParams: {
        id: id
      }
    });
  }

  openDrawerNew(): void {
    this.drawerService.create({
      nzTitle: 'Nuevo cliente',
      nzContent: CreateClienteComponent
    });
  }
}
