import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { ContactosRequest } from "../requests/contactos.request";
import { ContactoModel } from "../models/contacto.model";

@Injectable({
    providedIn: 'root'
})
export class ContactosFacade {
    constructor(private request: ContactosRequest) {
    }

    query(): Observable<ContactoModel[]> {
        return this.request.query();
    }

    get(id: string): Observable<ContactoModel> {
        return this.request.get(id);
    }

    create(contacto: ContactoModel): Observable<void> {
        return from(this.request.create(contacto));
    }

    update(contacto: ContactoModel): Observable<void> {
        return from(this.request.update(contacto));
    }

    delete(id: string): Observable<void> {
        return from(this.request.delete(id));
    }
}
