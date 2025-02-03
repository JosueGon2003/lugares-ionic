import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'lugares', loadComponent: () => import('./pages/lugares/lugares.page').then(m => m.LugaresPage) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'detallelugar/:id', loadComponent: () => import('./pages/detallelugar/detallelugar.page').then(m => m.DetallelugarPage) },
  { path: 'agregarlugar', loadComponent: () => import('./pages/agregarlugar/agregarlugar.page').then(m => m.AgregarlugarPage) },
  { path: 'modificarlugar/:id', loadComponent: () => import('./pages/modificarlugar/modificarlugar.page').then(m => m.ModificarlugarPage) },
  { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage) },
  { path: 'registro', loadComponent: () => import('./pages/registro/registro.page').then(m => m.RegistroPage ) },

];