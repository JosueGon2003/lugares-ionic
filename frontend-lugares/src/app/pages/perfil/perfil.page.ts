import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonButtons, IonToolbar,IonBackButton,IonCard,IonCardHeader,IonCardTitle, IonCardContent, IonButton} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonContent,IonButtons, IonBackButton, IonButton,IonCard, IonHeader, IonTitle, IonToolbar,IonCardTitle, IonCardContent, IonButton,CommonModule, FormsModule,IonCardHeader]
})
export class PerfilPage implements OnInit {
  username: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router,  private alertController: AlertController  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username = payload.username;
      this.role = payload.role;
    }
  }

  async confirmarCerrarSesion() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: '¿Quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.cerrarSesion();
          },
        },
      ],
    });

    await alert.present();
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
