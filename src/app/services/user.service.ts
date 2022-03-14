import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditarUsuarioModel } from '../models/editarUsuarioModel';
import { Login } from '../models/login';
import { NovoUsuarioModel } from '../models/novoUsuarioModel';
import { UsuarioModel } from '../models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.api}/usuario`;

  constructor(
    private http: HttpClient
  ) { }


  public login(login: Login){
    return this.http.post(`${this.url}/login`, login)
  }

  public create(user: NovoUsuarioModel) {
    return this.http.post(this.url, user);
  }

  public update(user: EditarUsuarioModel) {
    return this.http.put(this.url, user);
  }

  public delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  public getAll(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(this.url);
  }

  public getById(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.url}/${id}`);
  }

}
