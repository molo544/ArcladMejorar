import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
  trend?: 'up' | 'down';
}

interface Activity {
  icon: string;
  title: string;
  time: string;
  color: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  private router = inject(Router);
  
  // Relacionar cada actividad con un id de acci�n (mock)
  private activityToActionId: Record<string, string> = {
    'DASHBOARD.CORRECTIVE_ACTION_OVERDUE': '1',
    'DASHBOARD.ACTION_PLAN_OVERDUE': '2',
    'DASHBOARD.INTERNAL_AUDIT': '3',
    'DASHBOARD.IMPROVEMENT_PLAN': '1',
    'DASHBOARD.PROCESS_REVIEW_COMPLETED': '2'
  };

  onActivityClick(activity: Activity) {
    const actionId = this.activityToActionId[activity.title] || '1';
    this.router.navigate([`/activities/actions/${actionId}`], { queryParams: { tab: 'implementacion' } });
  }
  
  // Primera fila - M�tricas principales
  stats: StatCard[] = [
    {
      title: 'DASHBOARD.CORRECTIVE_ACTIONS',
      value: '230',
      subtitle: 'DASHBOARD.VS_PREVIOUS_MONTH',
      icon: 'build_circle',
      color: '#ff6b47',
      trend: 'up'
    },
    {
      title: 'DASHBOARD.ACTION_PLANS',
      value: '19',
      subtitle: 'DASHBOARD.NEW_THIS_WEEK',
      icon: 'assignment',
      color: '#17cf54',
      trend: 'up'
    },
    {
      title: 'DASHBOARD.CORRECTIVE_ACTION_EFFICIENCY',
      value: '75%',
      subtitle: 'DASHBOARD.URGENT',
      icon: 'inventory_2',
      color: '#4dd0e1'
    },
    {
      title: 'DASHBOARD.ACTION_PLAN_EFFICIENCY',
      value: '74%',
      subtitle: 'DASHBOARD.LOW_IN_PRODUCTS',
      icon: 'warehouse',
      color: '#42a5f5',
      trend: 'down'
    }
  ];

  // Segunda fila - M�tricas de actividades (eliminadas)
  activitiesStats: StatCard[] = [];

  // Notificaciones
  notifications: Activity[] = [
    {
      icon: 'notification_important',
      title: 'DASHBOARD.NEW_AUDIT_SCHEDULED',
      time: 'DASHBOARD.TIME_1_HOUR',
      color: '#f59e0b'
    },
    {
      icon: 'warning',
      title: 'DASHBOARD.CORRECTIVE_ACTION_DUE',
      time: 'DASHBOARD.TIME_3_HOURS',
      color: '#ef4444'
    },
    {
      icon: 'info',
      title: 'DASHBOARD.NEW_ISO_DOCUMENT_AVAILABLE',
      time: 'DASHBOARD.YESTERDAY',
      color: '#3b82f6'
    },
    {
      icon: 'check_circle',
      title: 'DASHBOARD.IMPROVEMENT_PLAN_APPROVED',
      time: 'DASHBOARD.TIME_2_DAYS',
      color: '#17cf54'
    }
  ];

  // Actividades recientes (incluye vencidas y pendientes)
  recentActivities: Activity[] = [
    // Actividades vencidas
    {
      icon: 'error',
      title: 'DASHBOARD.CORRECTIVE_ACTION_OVERDUE',
      time: 'DASHBOARD.TIME_3_DAYS',
      color: '#ef4444'
    },
    {
      icon: 'schedule',
      title: 'DASHBOARD.ACTION_PLAN_OVERDUE',
      time: 'DASHBOARD.TIME_1_WEEK',
      color: '#ef4444'
    },
    // Actividades por vencerse
    {
      icon: 'schedule',
      title: 'DASHBOARD.INTERNAL_AUDIT',
      time: 'DASHBOARD.TIME_DUE_2_DAYS',
      color: '#f59e0b'
    },
    {
      icon: 'assignment',
      title: 'DASHBOARD.IMPROVEMENT_PLAN',
      time: 'DASHBOARD.TIME_DUE_5_DAYS',
      color: '#f59e0b'
    },
    // Actividades recientes
    {
      icon: 'check_circle',
      title: 'DASHBOARD.PROCESS_REVIEW_COMPLETED',
      time: 'DASHBOARD.TIME_2_HOURS',
      color: '#17cf54'
    }
  ];
}
