import { Routes } from '@angular/router';

export const ALERTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/alerts-page/alerts-page').then(m => m.AlertsPage)
  },
  {
    path: 'new',
    loadComponent: () => import('./pages/alert-details-page/alert-details-page').then(m => m.AlertDetailsPage)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/alert-details-page/alert-details-page').then(m => m.AlertDetailsPage)
  }
];
