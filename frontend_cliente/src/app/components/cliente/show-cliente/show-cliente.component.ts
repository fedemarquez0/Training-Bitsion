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
  styleUrl: './show-cliente.component.css',
})
export class ShowClienteComponent {
  datatable: any = [];
  searchText: string = '';
  loading$ = this.clienteService.loading$;

  constructor(
    private clienteService: ClienteService,
    private userService: UserService,
    private router: Router,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.onDataTable();
  }

  onClickLogout() {
    this.userService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }

  onDataTable() {
    this.clienteService.getClientes().then((res) => {
      this.datatable = res;
      console.log(res);
    });
  }

  deleteCliente(id: number) {
    this.modal.confirm({
      nzTitle: 'Estas seguro que desea eliminar este cliente?',
      nzContent: '<b style="color: red;">Esta accion no se puede deshacer!!</b>',
      nzOkText: 'Sí, estoy seguro',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.clienteService.deleteClientes(id).subscribe((res) => {
          if (res) {
            this.onDataTable();
            this.notification.create(
              'success',
              'Eliminar cliente',
              'Cliente eliminado correctamente.'
            );
          } else {
            this.notification.create(
              'error',
              'Eliminar cliente',
              'Error al eliminar cliente, intente mas tarde.'
            );
          }
        });
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        return;
      },
    });
  }

  searchCliente() {
    this.clienteService.searchCliente(this.searchText).then((res) => {
      this.datatable = res;
      console.log(res);
    });
  }

  openDrawerEdit(id: number): void {
    const modalRef = this.drawerService.create({
      nzTitle: 'Editar Cliente',
      nzWidth: 750,
      nzContent: EditClienteComponent,
      nzContentParams: {
        id: id,
      },
    });

    modalRef.afterClose.subscribe(() => {
      this.onDataTable();
    });
  }

  openDrawerNew(): void {
    const modalRef = this.drawerService.create({
      nzTitle: 'Nuevo cliente',
      nzWidth: 750,
      nzContent: CreateClienteComponent,
    });

    modalRef.afterClose.subscribe(() => {
      this.onDataTable();
    });
  }
}
