import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ScreenOrientation } from "@capacitor/screen-orientation";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor() { }

  async ngOnInit() {
    const permisos = await LocalNotifications.checkPermissions();
    if (permisos.display !== 'granted') {
      const permisos = await LocalNotifications.requestPermissions();
      if (permisos.display === 'denied') {
        // Informamos que no habrá notificaciones
      }
    }
    ScreenOrientation.addListener('screenOrientationChange', async (orientation) => {
      const permisos = await LocalNotifications.checkPermissions();
      if (permisos.display === 'denied') return;
      // Aquí presentaremos las notificaciones
      const agenda = await LocalNotifications.schedule({
        notifications: [{
          id: Math.round(Math.random()),
          title: 'Cambio de orientación',
          body: `Se ha cambiado la orientación por: ${orientation.type}`,
        }]
      });
      console.log(agenda.notifications);
    });
  }
}
