import { Component, OnInit } from '@angular/core';
import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation';
import { registerPlugin } from '@capacitor/core';
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  coordenadas: any;
  watchId: string = '';
  constructor() {
  }

  async ngOnInit(): Promise<void> {

    const watchOptions = {
      backgroundMessage: 'Cancelar para evitar consumo de bateria',
      backgroundTitle: 'Geolocalización en segundo plano',
      requestPermissions: true,
      stale: false,
      distanceFilter: 10,
    };

    backgroundGeolocation.addWatcher(watchOptions, (position, error) => {
      this
      this.coordenadas = position;
      console.log('Coordenadas actualizadas', this.coordenadas);
    });

    this.coordenadas = await Geolocation.getCurrentPosition();
    console.log(this.coordenadas);

    this.watchId = await Geolocation.watchPosition({
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 30000,
    }, (position) => {
      this.coordenadas = position;
      console.log('Coordenadas actualizadas', this.coordenadas);
    })
  }

  async stopWatch(watchId: string): Promise<void> {
    await Geolocation.clearWatch({ id: this.watchId });
  }
}

