import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonCardTitle, IonLabel, IonFab, IonFabButton, IonIcon, IonButton, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log('Datos enviados al backend:', this.loginForm.value); // Verifica los datos
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/lugares']);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error); // Verifica la respuesta del backend
          alert('Credenciales incorrectas o problemas con el servidor.');
        }
      );
    }
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}

