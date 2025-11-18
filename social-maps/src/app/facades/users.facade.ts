import { Injectable } from '@angular/core';
import { UsersRequest } from "../requests/users.request";
import { from, Observable } from "rxjs";
import { UserModel } from "../models/user.models";

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {

  constructor(private request: UsersRequest) { }

  query(): Observable<UserModel[]> {
    return this.request.query();
  }

  get(id: string): Observable<UserModel> {
    return this.request.get(id);
  }

  update(user: UserModel) {
    return from(this.request.update(user));
  }

  create(user: UserModel) {
    return from(this.request.create(user));
  }

  signup(email: string, password: string) {
    return this.request.signup({ email, password });
  }

  login(email: string, password: string): Observable<UserModel> {
    return this.request.login(email, password);
  }

  delete(id: string) {
    return from(this.request.delete(id));
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.request.checkUserExists(email);
  }
}
