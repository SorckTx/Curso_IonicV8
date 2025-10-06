import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  public form: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private alertCtrl: AlertController, private toastCtrl: ToastController, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  async recuperarPassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Recuperar contraseña',
      subHeader: 'Por favor, ingresa tu email para recibir una nueva contraseña temporal',
      inputs: [
        {
          type: 'email',
          placeholder: 'tu@email.com'
        }
      ],
      buttons: [
        {
          text: 'Recuperar',
          role: 'confirm',
          handler: (): void => {
            this.successToast('Se ha enviado una nueva contraseña temporal a tu email');
            // Envío petición
            // Muestro toast
            // Redirijo
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  login(event: Event) {
    if (this.form.invalid) {
      return;
    }
    this.router.navigate(['tabs']);
  }

  async successToast(message: string): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastCtrl.create({
      message,
      duration: 5000,
    });
    await toast.present();
  }

  registro() {
    this.router.navigate(['register']);
  }
}
