import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface CorrectionActivity {
  activity: string;
  responsible: string;
  executionDate: string;
  evidence?: string;
  status: 'COMPLETADO' | 'EN_PROGRESO' | 'PENDIENTE';
}

@Component({
  selector: 'app-correction-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './correction-table.component.html',
  styleUrls: ['./correction-table.component.scss']
})
export class CorrectionTableComponent {
  @Input() activities: CorrectionActivity[] = [
    {
      activity: 'Ajustar parámetros de la máquina X.',
      responsible: 'J. Pérez',
      executionDate: '2024-05-15',
      evidence: 'Adjunto.pdf',
      status: 'COMPLETADO'
    },
    {
      activity: 'Capacitar al personal del turno A.',
      responsible: 'M. González',
      executionDate: '2024-05-20',
      status: 'EN_PROGRESO'
    },
    {
      activity: 'Inspeccionar lote de producción 123.',
      responsible: 'A. Rodríguez',
      executionDate: '2024-05-25',
      status: 'PENDIENTE'
    }
  ];

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'COMPLETADO': 'Completado',
      'EN_PROGRESO': 'En Progreso',
      'PENDIENTE': 'Pendiente'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'COMPLETADO': 'status-completed',
      'EN_PROGRESO': 'status-progress',
      'PENDIENTE': 'status-pending'
    };
    return classes[status] || '';
  }
}
