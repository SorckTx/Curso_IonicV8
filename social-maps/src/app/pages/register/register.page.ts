import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    provincia: new FormControl('', []),
    ciudad: new FormControl('', []),
    edad: new FormControl(0, []),
  });

  constructor(private router: Router, private toastCtrl: ToastController, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  async crearCuenta(e: Event): Promise<void> {
    if (this.form.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Hay campos incorrectos en el formulario',
        duration: 5000,
      });
      await toast.present();
      return;
    }
    const toast = await this.toastCtrl.create({
      message: `Cuenta creada exitosamente. Revisa ${this.form.get('email')?.value} para acceder.`,
      duration: 5000,
    });
    await toast.present();
    this.router.navigate(['/tabs']);
  }

}
