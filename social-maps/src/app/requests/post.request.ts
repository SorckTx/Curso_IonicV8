import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostRequest {
    private baseUrl: string = 'api/posts';

    constructor(private http: HttpClient) { }

    query(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

    get(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id.toString()}`);
    }

    create(post: any): Observable<any> {
        return this.http.post(`${this.baseUrl}`, post);
    }

    update(post: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/${post.id}`, post);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
