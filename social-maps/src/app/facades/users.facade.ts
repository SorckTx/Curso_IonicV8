import { Injectable } from '@angular/core';
import { UsersRequest } from "../requests/users.request";
import { catchError, from, map, Observable, of } from "rxjs";
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
    if (!email) {
      return of(false);
    }
    return this.request.checkUserExists(email).pipe(
      map((response: any) => {
        const users = response?.data ?? response ?? [];
        if (Array.isArray(users)) {
          return users.some((user: any) => user?.email?.toLowerCase() === email.toLowerCase());
        }
        if (typeof users === 'object') {
          return users?.email?.toLowerCase() === email.toLowerCase();
        }
        return false;
      }),
      catchError(() => of(false)),
    );
  }
}
