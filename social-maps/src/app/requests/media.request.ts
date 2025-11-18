import { Injectable } from "@angular/core";
import { from, map, Observable } from "rxjs";
import { NetworkService } from "../services/network.service";
import { CachingService } from "../services/caching.service";
import { collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc } from "@angular/fire/firestore";
import { MediaModel } from "../models/media.models";

@Injectable({
    providedIn: 'root'
})
export class MediaRequest {
    private NOMBRE_COLECCION: string = 'media';
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
                    return respuesta as MediaModel[];
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
                    const resultado = { id, ...data } as MediaModel;
                    this.cachingSvc.cacheRequest(`${this.NOMBRE_COLECCION}/${id}`, 'get', resultado);
                    return resultado;
                })
            )
        } else {
            return from(this.cachingSvc.getCachedRequest(`${this.NOMBRE_COLECCION}/${id}`, 'get'));
        }
    }

    create(media: MediaModel) {
        const documento = doc(collection(this.firestore, this.NOMBRE_COLECCION));
        return setDoc(documento, media);
    }

    update(media: any) {
        const documento = doc(this.firestore, `${this.NOMBRE_COLECCION}/${media.id!}`);
        const { id, ...data } = media;
        return setDoc(documento, data);
    }

    delete(id: string) {
        const documento = doc(this.firestore, `${this.NOMBRE_COLECCION}`, id);
        return deleteDoc(documento)
    }
}
