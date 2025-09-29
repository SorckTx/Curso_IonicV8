import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  nuevoUsuario = {
    nombre: '',
    apellidos: '',
    email: '',
    provincia: '',
    ciudad: '',
  };

  constructor(private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async crearCuenta(e: Event): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastCtrl.create({
      message: `Cuenta creada exitosamente. Revisa ${this.nuevoUsuario.email} para acceder.`,
      duration: 5000,
    });
    await toast.present();
    this.router.navigate(['/tabs']);
  }

}
