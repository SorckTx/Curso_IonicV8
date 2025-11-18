import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { PostsFacade } from 'src/app/facades/post.facade';
import { take } from 'rxjs/operators';
import { Geolocation } from '@capacitor/geolocation';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: false,
})
export class PostPage implements OnInit {
  @ViewChild('video') videoInput!: ElementRef;
  public isNew: boolean = true;
  public form: FormGroup = this.formBuilder.group({
    id: new FormControl(undefined),
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    contactos: new FormControl('', []),
    multimedia: new FormControl('', []),
    lat: new FormControl(0, []),
    lng: new FormControl(0, []),
  });
  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private postFacades: PostsFacade,
    private camaraSvc: CamaraService
  ) { }

  ngOnInit() {
  }

  public async procesar() {
    // Revisamos si el formulario no pasó validaciones
    if (this.form.invalid) {
      // De ser así, mostramos un toast informando al usuario
      const toast = await this.toastCtrl.create({
        message: `Hay campos incorrectos en el formulario, por favor revísalos y vuelve a intentar.`,
        duration: 5000,
      });
      await toast.present();
      return;
    }
    const posicion = await Geolocation.getCurrentPosition();
    this.form.get('lat')?.setValue(posicion.coords.latitude);
    this.form.get('lng')?.setValue(posicion.coords.longitude);
    // Caso contrario, dependiendo si estamos en modo "crear", vamos al método
    // a cargo del flujo de creación
    if (this.isNew) this.crearPost();
    // Si no, actualizamos la información provista por el usuario
    else this.actualizarPost();
  }

  private async crearPost() {
    const post = this.form.value;
    this.postFacades.create(post).pipe(
      take(1),
    ).subscribe(async (success) => {
      const toast = await this.toastCtrl.create({
        message: `Post creado exitosamente!`,
        duration: 5000,
      });
      await toast.present();
    }, async (error) => {
      const toast = await this.toastCtrl.create({
        message: `Hubo un error al crear el post, intentalo nuevamente.`,
        duration: 5000,
      });
      await toast.present();
    })
  }

  private async actualizarPost() {
    const post = this.form.value;
    this.postFacades.update(post).pipe(
      take(1),
    ).subscribe(async (success) => {
      const toast = await this.toastCtrl.create({
        message: `Post actualizado exitosamente!`,
        duration: 5000,
      });
      await toast.present();
    }, async (error) => {
      const toast = await this.toastCtrl.create({
        message: `Hubo un error al actualizar el post, intentalo nuevamente.`,
        duration: 5000,
      });
      await toast.present();
    })
  }

  public async tomarFoto() {
    // Tomamos la foto
    const foto = await this.camaraSvc.tomarFoto();
    // La guardamos en el dispositivo
    const fotoGuardada = await this.camaraSvc.guardarFoto(foto);
    // Tomamos el listado de elementos multimedia
    const multimedia = this.form.get('multimedia')?.value;
    // Agregamos nuestra foto
    multimedia.push(fotoGuardada);
    // Y pisamos el valor de multimedia con la nueva foto añadida
    this.form.get('multimedia')?.setValue(multimedia);
  }

  public async tomarVideo() {
    this.videoInput.nativeElement.click();
  }

  public async guardarVideo(evento: any) {
    const archivos = evento.currentTarget.files;
    if (archivos.length) {
      const video = archivos[0];
      const videoGuardado = await this.camaraSvc.guardarVideo(video);
      const multimedia = this.form.get('multimedia')?.value;
      multimedia.push(videoGuardado);
      this.form.get('multimedia')?.setValue(multimedia);
    }
  }
}