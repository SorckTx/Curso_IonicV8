import { Injectable } from "@angular/core";
import { BehaviorSubject, map, shareReplay } from "rxjs";
import { UserModel } from "../models/user.models";
import { UsersFacade } from "../facades/users.facade";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user$: BehaviorSubject<UserModel | undefined> = new BehaviorSubject<UserModel | undefined>(undefined);
    public userSession$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(
        private usersFacade: UsersFacade,
        private fireAuth: AngularFireAuth,
    ) {
    }

    getToken(): string | undefined {
        return this.user$.getValue()?.id;
    }

    async login(username: string, password: string) {
        const usuarioLogueado = await this.fireAuth.signInWithEmailAndPassword(username, password);
        this.userSession$.next(usuarioLogueado);
        // @ts-ignore
        const id = usuarioLogueado.user.uid;
        return this.usersFacade.get(id).pipe(
            shareReplay(),
            map(user => {
                this.setSession(user);
                return user;
            })
        );
    }

    async signup(form: UserModel) {
        return new Promise(async (resolve, reject) => {
            try {
                const cuentaUsuario = await this.fireAuth.createUserWithEmailAndPassword(
                    form.email,
                    form.password!,
                );
                // Ahora agregamos un registro de usuario a nuestra tabla con los datos de perfil
                const nacimientoTime = new Date(form.fechaNacimiento).getTime();
                const usuario: UserModel = {
                    ...form,
                    // Cambiamos la fecha de formato YYYY-MM-DD a timestamp
                    fechaNacimiento: nacimientoTime.toString(),
                };
                this.usersFacade.create(
                    // Asignamos como id el UID de la cuenta recién creada con FireAuth
                    { ...usuario, id: cuentaUsuario.user?.uid }
                ).subscribe(() => {
                    // Almacenamos sesion y perfil de usuario
                    this.userSession$.next(cuentaUsuario);
                    this.setSession(usuario);
                    resolve(true);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    logout() {
        this.userSession$.next(null);
        this.user$.next(undefined);
    }

    private setSession(user: UserModel) {
        localStorage.setItem('token', user?.id || '');
        localStorage.setItem('user', JSON.stringify(user));
    }
}
