import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lugar, Comentario } from '../models/Lugar';

@Injectable({
  providedIn: 'root',
})
export class LugaresService {
  private lugaresUrl = `${environment.apiUrl}/lugares`;
  private apiUrl = environment.apiUrl; // Configura la URL base del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los lugares
  getLugares(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.lugaresUrl);
  }

  // Obtener un lugar específico
  getLugar(id: number): Observable<Lugar> {
    return this.http.get<Lugar>(`${this.lugaresUrl}/${id}`);
  }

  // Agregar un nuevo lugar
  addLugar(lugar: { titulo: string; imagen: string }): Observable<Lugar> {
    return this.http.post<Lugar>(this.lugaresUrl, lugar);
  }

  // Modificar un lugar existente
  updateLugar(id: number, lugar: Lugar): Observable<Lugar> {
    return this.http.put<Lugar>(`${this.lugaresUrl}/${id}`, lugar);
  }

  // Eliminar un lugar
  deleteLugar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.lugaresUrl}/${id}`);
  }

  addComentario(lugarId: number, comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}/${lugarId}/comentarios`, comentario);
  }

  listarComentariosPorLugar(lugarId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/${lugarId}/comentarios`);
  }

  updateComentario(id: number, comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/comentarios/${id}`, comentario);
  }
  
  deleteComentario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comentarios/${id}`);
  }

  verificarAdmin(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificarAdmin`);
  }
}
