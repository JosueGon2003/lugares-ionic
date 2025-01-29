import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonFabButton, IonGrid, IonRow, IonCol, IonCardHeader, IonCard, IonCardTitle, IonFab, IonItem, IonList, IonAvatar, IonImg, IonLabel, IonCardContent, IonMenu, IonMenuButton, IonMenuToggle } from '@ionic/angular/standalone';
import { Lugar } from 'src/app/models/Lugar';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LugaresService } from 'src/app/service/lugares.service';
import { addIcons } from 'ionicons';
import { ModalController, MenuController,IonNote } from '@ionic/angular/standalone';
import { addOutline, airplane, globe, personCircle, logOut, personCircleOutline } from 'ionicons/icons';
import { AgregarlugarPage } from '../agregarlugar/agregarlugar.page';
import { AuthService } from 'src/app/service/auth.service'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  styleUrls: ['./lugares.page.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonContent, IonHeader, 
    IonTitle, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonRow, 
    IonCol, IonToolbar, IonButtons, IonButton, CommonModule, FormsModule, 
    RouterLink]
})
export class LugaresPage implements OnInit 
{
  isAdmin = false;
  lugares: Lugar[] = [];
  private lugarSubscription?: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private lugaresService: LugaresService, 
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,

  ) 
  {
    addIcons({ airplane, globe, addOutline, personCircle, logOut,personCircleOutline });
  }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.isAdmin = payload.role === 'admin';
    }
  
    this.lugaresService.getLugares().subscribe(
      (lugares) => (this.lugares = lugares),
      (error) => console.error('Error al cargar lugares', error)
    );
  }
  
  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: AgregarlugarPage,
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.role === 'lugarAgregado' && result.data) {
        this.lugares.push(result.data);
      }
    });
  
    return await modal.present();
  }
  
  cargarLugares() {
    this.lugaresService.getLugares().subscribe(
      (lugares) => {
        this.lugares = lugares;
      },
      (error) => {
        console.error('Error al cargar lugares:', error);
      }
    );
  }
  
  verDetalle(id: number) {
    this.router.navigate(['/detallelugar', id]);
  }
  
  

  toggleMenu() {
    this.menuCtrl.toggle(); // Abre o cierra el menú lateral
  }

  ngOnDestroy() {
    this.lugarSubscription?.unsubscribe();
  }
}
