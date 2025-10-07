import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersRequest {
  // Tomamos la baseUrl del entorno
  // Tomaremos como punto de partida https://reqres.in
  private baseUrl: string = `${environment.reqres.baseUrl}`;
  constructor(private http: HttpClient) { }

  public query(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  public get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id.toString()}`);
  }
  // TODO -> En un futuro, crear una interfaz de tipo Usuario
  public update(user: any): Observable<any> {
    // Esta nos expone una API httpss://reqres.in/api/users PUT,
    // Esta nos permite actualizar un empleado en la lista de empleados
    // a partir de su id
    return this.http.put(`${this.baseUrl}/users/${user?.id}`, {
      ...user
    });
  }

  public create(user: any): Observable<any> {
    // Esta nos expone una API httpss://reqres.in/api/users POST,
    // Esta nos permite crear un empleado en la lista de empleados
    return this.http.post(`${this.baseUrl}/users`, { ...user })
  }

  public signup(user: any): Observable<any> {
    // Esta nos expone una API httpss://reqres.in/api/register POST,
    // para crear cuentas de usuario.
    // Esta requiere email y password como parámetros
    return this.http.post(`${this.baseUrl}/register`, { ...user });
  }

  public delete(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/users/${id.toString()}`);
  }
}
