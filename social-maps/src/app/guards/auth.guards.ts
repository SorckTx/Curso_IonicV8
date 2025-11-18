import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
    }
    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const usuario = this.authService.user$.getValue();
        if (!!usuario) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }
}
