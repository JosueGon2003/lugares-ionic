import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput,IonContent, IonHeader, IonTitle, IonToolbar, ModalController, IonButtons, IonButton, IonLabel, IonItem } from '@ionic/angular/standalone';
import { LugaresService } from 'src/app/service/lugares.service';


@Component({
  selector: 'app-agregarlugar',
  templateUrl: './agregarlugar.page.html',
  styleUrls: ['./agregarlugar.page.scss'],
  standalone: true,
  imports: [IonInput,IonLabel, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonItem,IonToolbar,IonButton ,IonButtons,CommonModule, FormsModule,ReactiveFormsModule]
})
export class AgregarlugarPage implements OnInit {

  lugarForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder,     private lugaresService: LugaresService // Inyectar el servicio LugaresService
  ) {
    this.lugarForm = this.fb.group({
      titulo: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveLugar() {
    if (this.lugarForm.valid) {
      this.lugaresService.addLugar(this.lugarForm.value).subscribe(
        (lugar) => {
          console.log('Lugar agregado:', lugar);
          this.modalCtrl.dismiss(lugar);
          window.location.reload();
        },
        (error) => console.error('Error al agregar lugar', error)
      );
    }
  }


  ngOnInit() {

  }
}
