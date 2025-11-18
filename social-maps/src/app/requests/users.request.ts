import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc } from "@angular/fire/firestore";
import { UserModel } from "../models/user.models";

@Injectable({
  providedIn: 'root'
})
export class UsersRequest {
  // Tomamos la baseUrl del entorno
  // Tomaremos como punto de partida https://reqres.in
  private baseUrl: string = `${environment.reqres.baseUrl}`;
  private NOMBRE_COLECCION: string = 'users';
  constructor(private http: HttpClient, private firestore: Firestore) { }

  public query(): Observable<any> {
    const todosColeccion = collection(this.firestore, this.NOMBRE_COLECCION);
    return collectionData(todosColeccion, { idField: 'id' }).pipe(
      map(todos => todos as UserModel[]),
    );
  }

  public get(id: string): Observable<any> {
    const documento = doc(this.firestore, `${this.NOMBRE_COLECCION}/${id}`);
    return docSnapshots(documento).pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as UserModel;
      })
    )
  }

  public update(user: UserModel) {
    const documento = doc(this.firestore, `${this.NOMBRE_COLECCION}/${user.id!}`);
    const { id, ...data } = user;
    return setDoc(documento, data);
  }

  public create(user: any) {
    const documento = doc(collection(this.firestore, this.NOMBRE_COLECCION));
    return setDoc(documento, user);
  }

  public signup(user: any): Observable<any> {
    // TODO -> Luego reemplazaremos esta implementación por una con Authentication de Firebase
    return this.http.post(`${this.baseUrl}/register`, { ...user });
  }

  public login(email: string, password: string): Observable<any> {
    // TODO -> Luego reemplazaremos esta implementación por una con Authentication de Firebase
    return this.http.post(`${this.baseUrl}/auth`, {
      email,
      password,
    });
  }

  public delete(id: string) {
    const documento = doc(this.firestore, `${this.NOMBRE_COLECCION}`, id);
    return deleteDoc(documento)
  }

  public checkUserExists(email: string): Observable<any> {
    // TODO -> Luego reemplazaremos esta implementación por una con Authentication de Firebase
    return this.http.get(`${this.baseUrl}/users`, {
      params: {
        email,
      }
    })
  }
}