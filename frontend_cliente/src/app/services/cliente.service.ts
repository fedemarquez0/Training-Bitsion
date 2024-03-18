import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44314/api/Cliente"

  getClientes(){
    return this.http.get(this.url);
  }

  searchClienteId(id:number){
    return this.http.get(this.url + `/${id}`);
  }

  searchCliente(data:string){
    return this.http.get(this.url + `/search/?data=${data}`);
  }

  addClientes(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, cliente);
  }

  updateClientes(id:number, cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url + '/' + id, cliente);
  }

  deleteClientes(id:number){
    return this.http.delete(this.url + `/${id}`);
  }
}
