import { Component, OnInit } from '@angular/core';
import { PostsFacade } from "../../facades/post.facade";
import { PostModel } from "../../models/post.medal";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
  standalone: false,
})
export class PostModalComponent implements OnInit {

  // Aquí recibiremos datos al abrir el modal
  public modalData: any;
  // Aquí almacenaremos el Post como tal
  public post!: PostModel;
  constructor(
    private postsFacade: PostsFacade,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    // Recuperamos los datos del post a partir de su id
    this.postsFacade.get(this.modalData.postId).subscribe(postData => {
      // Almacenamos los datos para presentar
      this.post = postData;
      // A continuación podríamos cargar vídeos e imagenes
    })
  }

  volver() {
    // Cerramos el modal
    this.modalCtrl.dismiss(null);
  }

}
