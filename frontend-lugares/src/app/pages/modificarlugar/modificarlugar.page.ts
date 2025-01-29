import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonInput,IonBackButton  } from '@ionic/angular/standalone';
import { Comentario, Lugar } from 'src/app/models/Lugar';
import { ActivatedRoute, Router } from '@angular/router';
import { LugaresService } from 'src/app/service/lugares.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-modificarlugar',
  templateUrl: './modificarlugar.page.html',
  styleUrls: ['./modificarlugar.page.scss'],
  standalone: true,
  imports: [IonButton, IonList, IonLabel, IonItem, 
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonInput, CommonModule, FormsModule,
    IonBackButton]
})
export class ModificarlugarPage implements OnInit {

  lugar?: Lugar;
  comentariosEditando: Comentario[] = [];
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lugaresService: LugaresService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.isAdmin = payload.role === 'admin';
    }

    const lugarIdParam = this.route.snapshot.paramMap.get('id');
    if (lugarIdParam !== null) {
      const lugarId = +lugarIdParam;
      this.lugaresService.getLugar(lugarId).subscribe(
        (lugar) => {
          this.lugar = lugar;
          // Cargar los comentarios desde la base de datos
          this.cargarComentarios(lugarId);
        },
        (error) => console.error('Error al obtener el lugar', error)
      );
    }
  }

  // Método para cargar los comentarios desde la base de datos
  cargarComentarios(lugarId: number) {
    this.lugaresService.listarComentariosPorLugar(lugarId).subscribe(
      (comentarios) => {
        this.comentariosEditando = comentarios; // Asignar los comentarios cargados
      },
      (error) => console.error('Error al cargar comentarios', error)
    );
  }

  guardarCambios() {
    if (this.lugar) {
      // Actualizar los comentarios del lugar con los comentarios editados
      this.lugar.comentarios = this.comentariosEditando;

      // Asegurarnos de que los campos 'titulo' e 'imagen' estén bien actualizados
      console.log("Guardando cambios: ", this.lugar);

      // Enviar los datos actualizados al backend
      this.lugaresService.updateLugar(this.lugar.id, this.lugar).subscribe(
        (lugarActualizado) => {
          console.log('Lugar actualizado:', lugarActualizado);
          window.location.href = '/detallelugar/' + this.lugar?.id;
        },
        (error) => console.error('Error al actualizar el lugar', error)
      );
    }
  }

  eliminarComentario(index: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      const comentarioId = this.comentariosEditando[index].id;
      if (comentarioId) {
        this.lugaresService.deleteComentario(comentarioId).subscribe(
          () => {
            this.comentariosEditando.splice(index, 1); // Eliminar el comentario de la lista
          },
          (error) => console.error('Error al eliminar comentario', error)
        );
      }
    }
  }
}
