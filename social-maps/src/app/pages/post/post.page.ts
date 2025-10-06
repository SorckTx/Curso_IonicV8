import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: false,
})
export class PostPage implements OnInit {
  public isNew: boolean = true;
  public form: FormGroup = this.formBuilder.group({
    id: new FormControl(null, []),
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    contactos: new FormControl('', []),
    multimedia: new FormControl('', []),
  });
  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
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
    // Caso contrario, dependiendo si estamos en modo "crear", vamos al método
    // a cargo del flujo de creación
    if (this.isNew) this.crearPost();
    // Si no, actualizamos la información provista por el usuario
    else this.actualizarPost();
  }

  private async crearPost() {
    const toast = await this.toastCtrl.create({
      message: `Post creado exitosamente!`,
      duration: 5000,
    });
    await toast.present();
  }

  private async actualizarPost() {
    const toast = await this.toastCtrl.create({
      message: `Post actualizado exitosamente!`,
      duration: 5000,
    });
    await toast.present();
  }
}