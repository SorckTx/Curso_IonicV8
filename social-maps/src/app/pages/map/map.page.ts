import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../../environments/environment';
import { PostsFacade } from 'src/app/facades/post.facade';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post.medal';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: false,
})
export class MapPage implements OnInit, ViewDidEnter {
  posts: PostModel[] = [];

  @ViewChild('mapa') mapaRef!: ElementRef<HTMLElement>;
  // Variable donde alojamos el resultado de GoogleMap.create
  gmap!: GoogleMap;
  marcadores: any[] = [];
  constructor(
    private router: Router,
    private postsFacade: PostsFacade,
    private modalCtrl: ModalController,
  ) { }

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
    this.cargarMarcadores();
  }

  cargarMarcadores() {
    this.postsFacade.query().subscribe(posts => {
      this.posts = posts;
      this.posts.map(async (post) => {
        // Pasamos tambien postId
        await this.addMarker(post.titulo, post.lat, post.lng, post.id!);
        console.log('marker añadido');
      });
    });
  }

  async addMarker(titulo: string, lat: number, lng: number, postId: string) {
    const marcador = {
      id: '',
      coordinate: {
        lat,
        lng,
      },
      titulo,
      // Agregamos postId como parametro tambien
      postId,
    };
    marcador.id = await this.gmap.addMarker(marcador);
    this.gmap.setOnMarkerClickListener(async (data) => {
      // Presentamos el modal
      const modal = await this.modalCtrl.create({
        component: PostModalComponent,
        componentProps: {
          modalData: {
            // Pasamos el postId como parametro unico a la
            // propiedad modalData de nuestro componente modal
            postId: marcador.postId
          },
        }
      });
      await modal.present();
    });
    this.marcadores.push(marcador);
  }

  crearPost() {
    this.router.navigate(['post']);
  }
}
