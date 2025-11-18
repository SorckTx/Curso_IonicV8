import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NetworkService } from "./network.service";
import { CachingService } from "./caching.service";

@Injectable({
    providedIn: 'root'
})
export class PostsRequest {
    private baseUrl: string = 'api/posts';
    constructor(
        private http: HttpClient,
        private networkSvc: NetworkService,
        private cachingSvc: CachingService,
    ) {
    }

    query(): Observable<any> {
        if (this.networkSvc.internetConnected.getValue()) {
            return this.http.get(this.baseUrl).pipe(
                map(async (respuesta) => {
                    this.cachingSvc.cacheRequest(this.baseUrl, 'get', respuesta);
                    return respuesta;
                })
            );
        } else {
            return from(this.cachingSvc.getCachedRequest(this.baseUrl, 'get'));
        }
    }

    get(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);

        if (this.networkSvc.internetConnected.getValue()) {
            return this.http.get(`${this.baseUrl}/${id}`).pipe(
                map((respuesta) => {
                    this.cachingSvc.cacheRequest(`${this.baseUrl}/${id}`, 'get', respuesta);
                    return respuesta;
                })
            );
        } else {
            return from(this.cachingSvc.getCachedRequest(`${this.baseUrl}/${id}`, 'get'));
        }
    }
}