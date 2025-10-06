import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  // Agregamos cada campo que compone el perfil de usuario
  public form: FormGroup = this.formBuilder.group({
    id: new FormControl('', []),
    perfil: new FormControl('', []),
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', []),
    sexo: new FormControl('', []),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', []),
  });

  public formPwd: FormGroup = this.formBuilder.group({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    newPasswordConfirm: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  public async procesar() {
    if (this.form.invalid) {
      // Mostramos mensaje en caso de error
      const toast = await this.toastCtrl.create({
        message: `Algunos datos del formulario estan incompletos.`,
        duration: 5000,
      });
      await toast.present();
      return;
    }
    // Mostramos mensaje en caso de exito
    const toast = await this.toastCtrl.create({
      message: `Datos del perfil actualizados correctamente.`,
      duration: 5000,
    });
    await toast.present();
  }

  public async cambiarClave() {
    if (this.form.invalid) {
      // Mostramos mensaje en caso de error
      const toast = await this.toastCtrl.create({
        message: `Algunos datos del formulario son incorrectos.`,
        duration: 5000,
      });
      await toast.present();
      return;
    }
    // Mostramos mensaje en caso de exito
    const toast = await this.toastCtrl.create({
      message: `Contraseña actualizada correctamente.`,
      duration: 5000,
    });
    await toast.present();
  }
}
