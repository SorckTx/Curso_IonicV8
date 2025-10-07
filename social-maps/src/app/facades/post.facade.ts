import { Injectable } from '@angular/core';
import { PostRequest } from '../requests/post.request';

@Injectable({
    providedIn: 'root'
})
export class PostFacades {
    constructor(private request: PostRequest) { }

    query() {
        return this.request.query();
    }

    get(id: number) {
        return this.request.get(id);
    }

    create(post: any) {
        return this.request.create(post);
    }

    update(post: any) {
        return this.request.update(post);
    }

    delete(id: number) {
        return this.request.delete(id);
    }
}

