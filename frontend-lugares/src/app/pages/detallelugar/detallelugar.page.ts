import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
  IonItem,
  IonCardTitle,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonBackButton,
  IonButtons,
  IonCard,
} from '@ionic/angular/standalone';
import { Comentario, Lugar } from 'src/app/models/Lugar';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LugaresService } from 'src/app/service/lugares.service';
import { addIcons } from 'ionicons';
import {
  chatbubblesOutline,
  closeCircleOutline,
  createOutline,
  pencilOutline,
  personCircleOutline,
  transgender,
  trashOutline,
  ellipsisVerticalOutline,
} from 'ionicons/icons';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-detallelugar',
  templateUrl: './detallelugar.page.html',
  styleUrls: ['./detallelugar.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonFabButton,
    IonFab,
    IonLabel,
    IonCardTitle,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class DetallelugarPage implements OnInit {
  isAdmin = false;
  lugar?: Lugar;
  comentario: Comentario = { id: 0, name: '', comentario: '' };
  authenticatedUsername: string = ''; // Nombre del usuario autenticado
  private lugarSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lugaresService: LugaresService,
    private alertController: AlertController, // Inyectar el AlertController
    private authService: AuthService
  ) {
    addIcons({
      pencilOutline,
      closeCircleOutline,
      chatbubblesOutline,
      createOutline,
      trashOutline,
      personCircleOutline,
      ellipsisVerticalOutline,
    });
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
      this.lugarSubscription = this.lugaresService
        .getLugar(+id)
        .subscribe((lugar) => {
          this.lugar = lugar;
          this.cargarComentarios(lugar.id);
        });
    }
  }

  ngOnDestroy() {
    this.lugarSubscription?.unsubscribe();
  }

  cargarComentarios(lugarId: number) {
    this.lugaresService
      .listarComentariosPorLugar(lugarId)
      .subscribe((comentarios) => {
        if (this.lugar) {
          this.lugar.comentarios = comentarios.map((comentario) => ({
            id: comentario.id,
            name: comentario.name,
            comentario: comentario.comentario,
          }));
        }
      });
  }

  async abrirMenuComentario(comentario: Comentario) {
    const alert = await this.alertController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.editarComentario(comentario);
          },
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.eliminarComentario(comentario.id!);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }
  async editarComentario(comentario: Comentario) {
    const alert = await this.alertController.create({
      header: 'Editar Comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'textarea', // Cambiamos a textarea para mejor experiencia en móviles
          value: comentario.comentario,
          placeholder: 'Escribe tu comentario aquí...',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary', // Añadimos una clase CSS para estilos personalizados
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.confirmarEliminacionComentario(comentario.id!);
          },
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
          },
        },
      ],
    });
  
    await alert.present();
  }
  async confirmarEliminacionComentario(comentarioId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este comentario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarComentario(comentarioId);
          },
        },
      ],
    });
  
    await alert.present();
  }
  eliminarComentario(comentarioId: number) {
    this.lugaresService.deleteComentario(comentarioId).subscribe(
      () => {
        this.lugar!.comentarios = this.lugar!.comentarios?.filter(
          (comentario) => comentario.id !== comentarioId
        );
        this.mostrarAlerta('Eliminación exitosa', 'El comentario ha sido eliminado correctamente.');
      },
      (error) => {
        console.error('Error al eliminar comentario', error);
        this.mostrarAlerta('Error', 'No se pudo eliminar el comentario. Por favor, intenta nuevamente.');
      }
    );
  }
  eliminarLugar() {
    if (this.lugar) {
      this.lugaresService.deleteLugar(this.lugar.id).subscribe(
        () => {
          this.mostrarAlerta('Eliminación exitosa', 'El lugar ha sido eliminado correctamente.').then(() => {
            window.location.href = '/lugares';
          });
        },
        (error) => {
          console.error('Error al eliminar lugar', error);
          this.mostrarAlerta('Error', 'No se pudo eliminar el lugar. Por favor, intenta nuevamente.');
        }
      );
    }
  }
  
  async mostrarAlerta(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss(); // Espera a que la alerta se cierre
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

 
}
