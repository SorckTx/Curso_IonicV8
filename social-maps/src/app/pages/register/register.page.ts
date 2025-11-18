import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersFacade } from '../../facades/users.facade';
import { UsernameValidator } from '../../validators/username.validator';
import { UserModel } from '../../models/user.models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  form: FormGroup = this.formBuilder.group({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    provincia: new FormControl('', []),
    ciudad: new FormControl('', []),
    fechaNacimiento: new FormControl('', []),
  }, {
    validators: UsernameValidator.usernameExists('email', this.usersFacade)
  });

  constructor(private router: Router, private toastCtrl: ToastController, private formBuilder: FormBuilder, private usersFacade: UsersFacade, private fireAuth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit() { }

  async crearCuenta(e: Event) {
    if (this.form.invalid) {
      const toast = await this.toastCtrl.create({
        message: `Hay campos incorrectos en el formulario, por favor revísalos y vuelve a intentar.`,
        duration: 5000,
      });
      await toast.present();
      return;
    }
    try {
      await this.authService.signup(this.form.getRawValue());
      const toast = await this.toastCtrl.create({
        message: `Cuenta creada exitosamente. Revisa ${this.form.get('email')?.value} para acceder.`,
        duration: 5000,
      });
      await toast.present();
      this.router.navigate(['login']);
    } catch (e) {
      console.log(e);
      const toast = await this.toastCtrl.create({
        message: `Hubo un inconveniente al intentar crear la cuenta.`,
        duration: 5000,
      });
      await toast.present();
    }
  }

  public async actualizarUsuario() {
    if (this.form.invalid) {
      const toast = await this.toastCtrl.create({
        message: `Hay campos incorrectos en el formulario, por favor revísalos y vuelve a intentar.`,
        duration: 5000,
      });
      await toast.present();
      return;
    } else {
      const usuario: UserModel = {
        id: this.form.get('id')?.value,
        nombre: this.form.get('nombre')?.value,
        apellidos: this.form.get('apellidos')?.value,
        email: this.form.get('email')?.value,
        telefono: this.form.get('telefono')?.value,
        fechaNacimiento: this.form.get('fechaNacimiento')?.value,
        ciudad: this.form.get('ciudad')?.value,
        provincia: this.form.get('provincia')?.value,
      };
      this.usersFacade.update(usuario).subscribe(async () => {
        const toast = await this.toastCtrl.create({
          message: `Datos actualizados exitosamente.`,
          duration: 5000,
        });
        await toast.present();
      }, async (error) => {
        const toast = await this.toastCtrl.create({
          message: `Algo falló al intentar actualizar los datos.`,
          duration: 5000,
        });
        await toast.present();
      });
    }
  }
}
