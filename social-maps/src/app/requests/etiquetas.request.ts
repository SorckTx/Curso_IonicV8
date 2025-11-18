import { Injectable } from "@angular/core";
import { from, map, Observable } from "rxjs";
import { NetworkService } from "../services/network.service";
import { CachingService } from "../services/caching.service";
import { collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc } from "@angular/fire/firestore";
import { EtiquetaModel } from "../models/etiqueta.model";

@Injectable({
    providedIn: 'root'
})
export class EtiquetasRequest {
    private NOMBRE_COLECCION: string = 'etiquetas';
    constructor(
        private networkSvc: NetworkService,
        private cachingSvc: CachingService,
        private firestore: Firestore,
    ) {
    }

    query(): Observable<any> {
        if (this.networkSvc.internetConnected.getValue()) {
            const coleccion = collection(this.firestore, this.NOMBRE_COLECCION);
            return collectionData(coleccion, { idField: 'id' }).pipe(
                map(respuesta => {
                    this.cachingSvc.cacheRequest(this.NOMBRE_COLECCION, 'get', respuesta);
                    return respuesta as EtiquetaModel[];
                }),
            );
        } else {
            return from(this.cachingSvc.getCachedRequest(this.NOMBRE_COLECCION, 'get'));
        }
    }

    get(id: string): Observable<any> {
        if (this.networkSvc.internetConnected.getValue()) {
            const documento = doc(this.firestore, `${this.NOMBRE_COLECCION}/${id}`);
            return docSnapshots(documento).pipe(
                map(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    const resultado = { id, ...data } as EtiquetaModel;
                    this.cachingSvc.cacheRequest(`${this.NOMBRE_COLECCION}/${id}`, 'get', resultado);
                    return resultado;
                })
            )
        } else {
            return from(this.cachingSvc.getCachedRequest(`${this.NOMBRE_COLECCION}/${id}`, 'get'));
        }
    }

    create(etiqueta: EtiquetaModel) {
        const documento = doc(collection(this.firestore, this.NOMBRE_COLECCION));
        return setDoc(documento, etiqueta);
    }

    update(etiqueta: any) {
        const documento = doc(this.firestore, `${this.NOMBRE_COLECCION}/${etiqueta.id!}`);
        const { id, ...data } = etiqueta;
        return setDoc(documento, data);
    }

    delete(id: string) {
        const documento = doc(this.firestore, `${this.NOMBRE_COLECCION}`, id);
        return deleteDoc(documento)
    }
}
