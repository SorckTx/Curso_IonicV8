import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { EtiquetasRequest } from "../requests/etiquetas.request";
import { EtiquetaModel } from "../models/etiqueta.model";

@Injectable({
    providedIn: 'root'
})
export class EtiquetasFacade {
    constructor(private request: EtiquetasRequest) {
    }

    query(): Observable<EtiquetaModel[]> {
        return this.request.query();
    }

    get(id: string): Observable<EtiquetaModel> {
        return this.request.get(id);
    }

    create(etiqueta: EtiquetaModel): Observable<void> {
        return from(this.request.create(etiqueta));
    }

    update(etiqueta: EtiquetaModel): Observable<void> {
        return from(this.request.update(etiqueta));
    }

    delete(id: string): Observable<void> {
        return from(this.request.delete(id));
    }
}
