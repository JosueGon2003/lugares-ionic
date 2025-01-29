import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,AlertController, IonItem, IonCardTitle, IonLabel, IonFab, IonFabButton, IonIcon, IonButton, IonBackButton, IonButtons, IonCard } from '@ionic/angular/standalone';
import { Comentario, Lugar } from 'src/app/models/Lugar';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LugaresService } from 'src/app/service/lugares.service';
import { addIcons } from 'ionicons';
import { chatbubblesOutline, closeCircleOutline, createOutline, pencilOutline, personCircleOutline, transgender, trashOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-detallelugar',
  templateUrl: './detallelugar.page.html',
  styleUrls: ['./detallelugar.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonButton, IonIcon, IonFabButton, IonFab, IonLabel, IonCardTitle, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink]
})
export class DetallelugarPage implements OnInit {
  isAdmin = false;
  lugar?: Lugar;
  comentario: Comentario = { id: 0, name: '', comentario: '' };
  authenticatedUsername: string = ''; // Nombre del usuario autenticado
  private lugarSubscription?: Subscription;
  //mostrarFormularioComentario = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lugaresService: LugaresService,
    private alertController: AlertController,  // Inyectar el AlertController
    private authService: AuthService
  ) {
    addIcons({pencilOutline,closeCircleOutline,chatbubblesOutline,createOutline,trashOutline,personCircleOutline});

  }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.isAdmin = payload.role === 'admin';
      this.authenticatedUsername = payload.username; // Guardar el username del usuario autenticado
    }
  
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.lugarSubscription = this.lugaresService.getLugar(+id).subscribe(lugar => {
        this.lugar = lugar;
        this.cargarComentarios(lugar.id);
      });
    }
  }
  ngOnDestroy() {
    this.lugarSubscription?.unsubscribe();
  }

  cargarComentarios(lugarId: number) {
    this.lugaresService.listarComentariosPorLugar(lugarId).subscribe(comentarios => {
      if (this.lugar) {
        this.lugar.comentarios = comentarios.map(comentario => ({
          id: comentario.id,
          name: comentario.name, // Asegúrate de usar 'name'
          comentario: comentario.comentario
        }));
      }
    });
  }
  eliminarComentario(comentarioId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      this.lugaresService.deleteComentario(comentarioId).subscribe(
        () => {
          this.lugar!.comentarios = this.lugar!.comentarios?.filter(
            (comentario) => comentario.id !== comentarioId
          );
        },
        (error) => console.error('Error al eliminar comentario', error)
      );
    }
  }
  async editarComentario(comentario: Comentario) {
    const alert = await this.alertController.create({
      header: 'Editar Comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'text',
          value: comentario.comentario,
          placeholder: 'Comentario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.comentario) {
              comentario.comentario = data.comentario; // Actualizar localmente
              this.lugaresService.updateComentario(comentario.id!, comentario).subscribe(
                (comentarioActualizado) => {
                  console.log('Comentario actualizado:', comentarioActualizado);
                },
                (error) => console.error('Error al actualizar comentario', error)
              );
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  async mostrarFormularioComentario() {
    const alert = await this.alertController.create({
      header: 'Agregar Comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'text',
          placeholder: 'Comentario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (data) => {
            const token = this.authService.getToken();
            if (token) {
              const payload = JSON.parse(atob(token.split('.')[1]));
              const username = payload.username || 'Usuario'; // Usa el username del token
              this.agregarComentario(username, data.comentario);
            } else {
              this.alertController.create({
                header: 'Error',
                message: 'No se pudo determinar el usuario autenticado.',
                buttons: ['OK']
              }).then(alert => alert.present());
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  agregarComentario(name: string, comentario: string) {
    if (this.lugar && comentario) {
      this.lugaresService
        .addComentario(this.lugar.id, { name, comentario })
        .subscribe(
          (comentarioAgregado) => {
            if (!this.lugar?.comentarios) {
              this.lugar!.comentarios = [];
            }
            this.lugar?.comentarios.push(comentarioAgregado);
            this.comentario = { id: 0, name: '', comentario: '' };
          },
          (error) => {
            console.error('Error al agregar comentario', error);
            alert('No se pudo agregar el comentario. Por favor, intenta nuevamente.');
          }
        );
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  async confirmarEliminacion() {
    if (!this.isAdmin) {
      const alert = await this.alertController.create({
        header: 'Permiso denegado',
        message: 'Solo los administradores pueden eliminar lugares.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este lugar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarLugar();
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarLugar() {
    if (this.lugar) {
      this.lugaresService.deleteLugar(this.lugar.id).subscribe(
        () => {
          window.location.href = '/lugares';
        },
        (error) => {
          console.error('Error al eliminar lugar', error);
        }
      );
    }
  }
}
