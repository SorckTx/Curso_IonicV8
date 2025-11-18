import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Network } from "@capacitor/network";

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    public internetConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    constructor() {
        this.init();
    }

    private async init() {
        const status = await Network.getStatus();
        this.internetConnected.next(status.connected);

        Network.addListener('networkStatusChange', (status) => {
            this.internetConnected.next(status.connected);
        });
    }
}
