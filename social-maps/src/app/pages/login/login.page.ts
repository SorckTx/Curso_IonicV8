import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersFacade } from '../../facades/users.facade';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacade,
    private authService: AuthService
  ) {
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

  async login() {
    if (this.form.invalid) {
      await this.successToast('Los datos en el formulario son incorrectos/incompletos.');
      return;
    }
    try {
      const usuarioLogueado = await this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value);
      usuarioLogueado.subscribe(usuario => {
        this.router.navigate(['tabs']);
      });
    } catch (e) {
      await this.successToast('Credenciales incorrectas. Por favor revise sus credenciales y vuelva a intentarlo.');
    }
  }

  async successToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000
    });
    await toast.present();
  }

  registro() {
    this.router.navigate(['registro']);
  }
}

