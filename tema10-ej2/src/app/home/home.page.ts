import { Component, OnInit } from '@angular/core';
import { Network } from "@capacitor/network";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor() { }
  ngOnInit() {
    Network.addListener('networkStatusChange', (status) => {
      if (status.connected) {
        Haptics.impact({ style: ImpactStyle.Light });
      } else {
        Haptics.impact({ style: ImpactStyle.Heavy });
      }
    });
  }
}
