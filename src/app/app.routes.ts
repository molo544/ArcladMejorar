import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    loadComponent: () => import('./shared/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'alerts',
        loadChildren: () => import('./features/alerts/alerts.routes').then(m => m.ALERTS_ROUTES)
      },
      {
        path: 'branches',
        loadChildren: () => import('./features/branches/branches-routes').then(m => m.BRANCHES_ROUTES)
      },
      {
        path: 'activities',
        loadChildren: () => import('./features/activities/activities.routes').then(m => m.ACTIVITIES_ROUTES)
      }
    ]
  },
  // Ruta para cuando no se encuentra la página
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
