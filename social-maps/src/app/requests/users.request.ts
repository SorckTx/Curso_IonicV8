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

  public update(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${user?.id}`, {
      ...user
    });
  }

  public create(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, { ...user })
  }

  public signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { ...user });
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth`, {
      email,
      password,
    });
  }

  public delete(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/users/${id.toString()}`);
  }

  public checkUserExists(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, { params: { email } });

  }
}
