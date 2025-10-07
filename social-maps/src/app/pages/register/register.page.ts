import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersFacade } from '../../facades/users.facade';

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
    edad: new FormControl('', []),
  });

  constructor(private router: Router, private toastCtrl: ToastController, private formBuilder: FormBuilder, private usersFacade: UsersFacade) { }

  ngOnInit() {
  }

  async crearCuenta(e: Event) {
    if (this.form.invalid) {
      const toast = await this.toastCtrl.create({
        message: `Hay campos incorrectos en el formulario, por favor revísalos y vuelve a intentar.`,
        duration: 5000,
      });
      await toast.present();
      return;
    }
    // Aquí ahora agregamos una llamada a signup
    // Pasamos email y contraseña para crear una cuenta
    this.usersFacade.signup(
      this.form.get('email')?.value,
      this.form.get('password')?.value
    ).subscribe(async (usuarioCreado) => {
      // this.usersFacade.create(this.form.getRawValue()).subscribe();
      // Aquí pudiésemos llamar al método create, para crear una instancia
      // de este usuario en la lista de empleados
      // 
      // Y movemos el toast dentro del subscribe.
      const toast = await this.toastCtrl.create({
        message: `Cuenta creada exitosamente. Revisa ${this.form.get('email')?.value} para acceder.`,
        duration: 5000,
      });
      await toast.present();
      this.router.navigate(['login']);
    }, async (error) => {
      // Aqui podemos presentar un toast explicando que hubo un error
      const toast = await this.toastCtrl.create({
        message: `Hubo un error, intentalo nuevamente.`,
        duration: 5000,
      });
      await toast.present();
    })

  }
}
