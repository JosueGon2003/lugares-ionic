import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiUrl}`; // URL base de la API

  constructor(private http: HttpClient) { }

  
  register(user: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/registrar`, user);
  }

  // Iniciar sesión
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials);
  }

  // Guardar el token JWT en localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('userInfo', JSON.stringify(payload)); // Guardar información del usuario
  }
  // Obtener el token JWT de localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Eliminar el token JWT al cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
  }
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    }
    return null;
  }
  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Verificar si el usuario es administrador
  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'admin';
    }
    return false;
  }
}