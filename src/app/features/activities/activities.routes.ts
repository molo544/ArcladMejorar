import { Routes } from '@angular/router';

export const ACTIVITIES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/actions-page/actions-page').then(m => m.ActionsPageComponent),
    data: { title: 'Crear Actividad' }
  },
  {
    path: 'actions',
    loadComponent: () => import('./pages/actions-page/actions-page').then(m => m.ActionsPageComponent),
    data: { title: 'Acciones' }
  },
  {
    path: 'actions/:id',
    loadComponent: () => import('./pages/action-detail-page/action-detail-page').then(m => m.ActionDetailPageComponent),
    data: { title: 'Detalle de Acción' }
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/actions-page/actions-page').then(m => m.ActionsPageComponent),
    data: { title: 'Actividades' }
  }
];
