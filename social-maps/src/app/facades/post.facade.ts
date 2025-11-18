import { Injectable } from "@angular/core";
import { PostsRequest } from "../requests/post.request";
import { from, Observable } from "rxjs";
import { PostModel } from "../models/post.medal";

@Injectable({
    providedIn: 'root'
})
export class PostsFacade {
    constructor(private request: PostsRequest) {
    }

    query(): Observable<PostModel[]> {
        return this.request.query();
    }

    get(id: string): Observable<PostModel> {
        return this.request.get(id);
    }

    create(post: PostModel): Observable<void> {
        return from(this.request.create(post));
    }

    update(post: PostModel): Observable<void> {
        return from(this.request.update(post));
    }

    crearId(): string {
        return this.request.createId();
    }

    delete(id: string): Observable<void> {
        return from(this.request.delete(id));
    }
}
