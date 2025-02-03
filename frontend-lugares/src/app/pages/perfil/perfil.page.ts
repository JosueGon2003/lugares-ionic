import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonList,IonLabel, IonItem,IonRow, IonCol, IonGrid, IonTitle, IonButtons, IonToolbar, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LugaresService } from 'src/app/service/lugares.service';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons, IonBackButton,
    IonButton, IonCard, IonHeader, IonTitle, IonToolbar,
    IonCardTitle, IonCardContent, CommonModule, FormsModule,
    IonCardHeader, IonGrid, IonRow, IonCol,IonList,IonItem,IonLabel]
})
export class PerfilPage implements OnInit {
  username: string = '';
  role: string = '';
  email: string = '';
  phone: string = '';
  firstName: string = '';
  lastName: string = '';
  city: string = '';
  totalLugares: number = 0;
  totalComentarios: number = 0;
  ultimosLugares: any[] = []; // Cambia el tipo según tu modelo

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private lugaresService: LugaresService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username = payload.username;
      this.email = payload.email || 'No proporcionado';
      this.role = payload.role;
      this.phone = payload.phone || 'No proporcionado';
      this.firstName = payload.first_name || 'No proporcionado';
      this.lastName = payload.last_name || 'No proporcionado';
      this.city = payload.city || 'No proporcionado';
    }
 // Cargar estadísticas
  this.lugaresService.getLugares().subscribe({
    next: (lugares) => {
      this.totalLugares = lugares.length;
      this.cargarUltimosLugares(); // Cargar los últimos lugares agregados
    },
    error: (error) => console.error('Error al cargar estadísticas', error)
  });

  // Cargar total de comentarios
  this.lugaresService.listarTodosLosComentarios().subscribe({
    next: (comentarios) => {
      this.totalComentarios = comentarios.length; // Ahora debería funcionar
    },
    error: (error) => console.error('Error al cargar comentarios', error)
  });
}

  cargarUltimosLugares() {
    this.lugaresService.getLugares().subscribe({
      next: (lugares) => {
        this.ultimosLugares = lugares.slice(-5); // Obtener los últimos 5 lugares
      },
      error: (error) => console.error('Error al cargar últimos lugares', error)
    });
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