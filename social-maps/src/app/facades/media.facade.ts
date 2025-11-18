import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { MediaRequest } from "../requests/media.request";
import { MediaModel } from "../models/media.models";

@Injectable({
    providedIn: 'root'
})
export class MediaFacade {
    constructor(private request: MediaRequest) {
    }

    query(): Observable<MediaModel[]> {
        return this.request.query();
    }

    get(id: string): Observable<MediaModel> {
        return this.request.get(id);
    }

    create(mediaItem: MediaModel): Observable<void> {
        return from(this.request.create(mediaItem));
    }

    update(mediaItem: MediaModel): Observable<void> {
        return from(this.request.update(mediaItem));
    }

    delete(id: string): Observable<void> {
        return from(this.request.delete(id));
    }
}
