import { Injectable } from '@angular/core';
import { UsersRequest } from "../requests/users.request";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  // Importamos el singleton de UsersRequest
  constructor(private request: UsersRequest) { }
  // Y agregamos un método para cada operación
  query() {
    return this.request.query();
    /*
     * En la Facade, pudiésemos pre procesar datos con un pipe en el 
     * observable de la petición.
     * De modo que el procesamiento(digestión) de la información
     * no se realiza en el componente, sino en la fachada
     * */
  }

  get(id: number) {
    return this.request.get(id);
  }

  update(user: any) {
    return this.request.update(user);
  }


  create(user: any) {
    return this.request.create(user);
  }

  signup(email: string, password: string) {
    return this.request.signup({ email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.request.login(email, password);
  }

  delete(id: number) {
    return this.request.delete(id);
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.request.checkUserExists(email);
  }
}
