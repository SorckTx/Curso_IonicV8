import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: false,
})
export class MapPage implements OnInit, ViewDidEnter {

  @ViewChild('mapa') mapaRef!: ElementRef<HTMLElement>;
  // Variable donde alojamos el resultado de GoogleMap.create
  gmap!: GoogleMap;
  marcadores: any[] = [];
  constructor() { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.gmap = await GoogleMap.create({
      id: 'map',
      element: this.mapaRef.nativeElement,
      apiKey: environment.googleMaps.APIKey,
      config: {
        center: {
          // Aquí podeis reemplazar las coordenadas
          // por las de la ciudad en donde estéis
          lat: 39.47,
          lng: -0.376,
        },
        zoom: 8,
      },
    });
  }

  async addMarker(titulo: string, lat: number, lng: number) {
    const marcador = {
      id: '',
      coordinate: {
        lat,
        lng,
      },
      titulo,
    };
    marcador.id = await this.gmap.addMarker(marcador);
    this.marcadores.push(marcador);
  }
}
