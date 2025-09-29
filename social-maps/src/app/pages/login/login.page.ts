import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  usuario: any = {
    username: 'yepa@unmail.com',
    password: '1234',
  };
  constructor(private router: Router, private alertCtrl: AlertController, private toastCtrl: ToastController) {
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
    event.preventDefault();
    if (this.username === this.usuario.username && this.password === this.usuario.password) {
      this.router.navigate(['/tabs']);
    } else {
      alert('Credenciales incorrectas!');
    }
  }

  async successToast(message: string): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastCtrl.create({
      message,
    });
    await toast.present();
  }

  onIonInfinite(event: CustomEvent) {
    // Simula carga y completa el infinite scroll
    setTimeout(() => {
      (event.target as HTMLIonInfiniteScrollElement).complete();
    }, 300);
  }
}