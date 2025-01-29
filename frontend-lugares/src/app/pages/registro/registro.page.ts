import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, AlertController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton]
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async registrar(): Promise<void> {
    if (this.registroForm.valid) {
      this.authService.register(this.registroForm.value).subscribe(
        async (response) => {
          console.log('Usuario registrado:', response);
          const alert = await this.alertController.create({
            header: 'Nuevo Registro con éxito',
            message: 'Tu nueva cuenta ha sido creada con éxito.',
            buttons: ['OK']
          });
          await alert.present();
          
          alert.onDidDismiss().then(() => {
            this.router.navigate(['/login']);
          });
        },
        (error) => {
          console.error('Error al registrar:', error);
          alert('Error al registrar el usuario. Inténtalo de nuevo.');
        }
      );
    }
  }

  irALogin(): void {
    this.router.navigate(['/login']);
  }
}
