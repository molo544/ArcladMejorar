import { Component, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';

interface ImplementationActivity {
  id: number;
  activity: string;
  evidence: string;
  responsible: string;
  proposedDate: string;
  completionDate?: string;
  status: 'CUMPLIDO' | 'PENDIENTE' | 'EN_PROGRESO';
}

@Component({
  selector: 'app-implementation-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatPaginatorModule
  ],
  templateUrl: './implementation-table.component.html',
  styleUrl: './implementation-table.component.scss'
})
export class ImplementationTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Mock data basado en la imagen
  private allActivities: ImplementationActivity[] = [
    {
      id: 1,
      activity: 'ESTUDIAR REQUISITOS DE NORMA ISO 9001 E ISO 14001 APLICABLES AL PROCESO DE COMPRAS.',
      evidence: 'ACTA DE REUNIÓN',
      responsible: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      proposedDate: '03/10/2025',
      completionDate: '03/10/2025',
      status: 'CUMPLIDO'
    },
    {
      id: 2,
      activity: 'DEFINIR LA METODOLOGÍA PARA ESTRUCTURAR LA SELECCIÓN DE PROVEEDORES MP, PRODUCTOS Y SERVICIOS.',
      evidence: 'PROCEDIMIENTO DE SELECCIÓN',
      responsible: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      proposedDate: '31/10/2025',
      completionDate: undefined,
      status: 'PENDIENTE'
    },
    {
      id: 3,
      activity: 'DEFINIR LA METODOLOGÍA PARA ESTRUCTURAR LA EVALUACIÓN Y REVALUACIÓN Y SEGUIMIENTO DE PROVEEDORES.',
      evidence: 'PROCEDIMIENTO DE EVALUACIÓN',
      responsible: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      proposedDate: '31/10/2025',
      completionDate: undefined,
      status: 'PENDIENTE'
    },
    {
      id: 4,
      activity: 'LISTAR LOS SERVICIOS QUE SE CONTRATAN EN LA COMPAÑÍA E IDENTIFICAR LOS CRITERIOS TÉCNICOS, CALIDAD Y AMBIENTALES QUE SE DEBEN DE CONTEMPLAR.',
      evidence: 'MATRIZ DE SERVICIOS Y PRODUCTOS',
      responsible: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      proposedDate: '31/10/2025',
      completionDate: undefined,
      status: 'PENDIENTE'
    },
    {
      id: 5,
      activity: 'ACTUALIZAR LOS PROCEDIMIENTOS Y FORMATOS PARA LA SELECCIÓN Y EVALUACIÓN DE PROVEEDORES.',
      evidence: 'PROCEDIMIENTOS Y FORMATOS',
      responsible: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      proposedDate: '30/11/2025',
      completionDate: undefined,
      status: 'PENDIENTE'
    },
    {
      id: 6,
      activity: 'DEFINIR LA POLÍTICA DE COMPRAS',
      evidence: 'POLÍTICA DE COMPRAS',
      responsible: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      proposedDate: '31/12/2025',
      completionDate: undefined,
      status: 'PENDIENTE'
    },
    {
      id: 7,
      activity: 'SOCIALIZAR A LOS INVOLUCRADOS SOBRE LA NUEVA METODOLOGÍA PARA LA SELECCIÓN, EVALUACIÓN, REVALUACIÓN Y SEGUIMIENTO DE PROVEEDORES.',
      evidence: 'LISTA DE ASISTENCIA',
      responsible: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      proposedDate: '31/12/2025',
      completionDate: undefined,
      status: 'PENDIENTE'
    },
    {
      id: 8,
      activity: 'REALIZAR LA EVALUACIÓN DE PROVEEDORES CORRESPONDIENTE AL AÑO 2025',
      evidence: 'EVALUACIONES DE PROVEEDORES',
      responsible: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      proposedDate: '31/01/2026',
      completionDate: undefined,
      status: 'PENDIENTE'
    },
    {
      id: 9,
      activity: 'DEFINIR Y MEDIR EL INDICADOR EVALUACIÓN DE PROVEEDORES',
      evidence: 'ARCHIVO INTERNO',
      responsible: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      proposedDate: '31/01/2026',
      completionDate: undefined,
      status: 'PENDIENTE'
    }
  ];

  displayedColumns: string[] = ['id', 'activity', 'evidence', 'responsible', 'proposedDate', 'completionDate', 'status'];
  
  // Signals
  searchQuery = signal('');
  currentPageIndex = signal(0);
  pageSize = signal(10);
  
  // Computed
  filteredActivities = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      return this.allActivities;
    }
    
    return this.allActivities.filter(activity =>
      activity.activity.toLowerCase().includes(query) ||
      activity.evidence.toLowerCase().includes(query) ||
      activity.responsible.toLowerCase().includes(query) ||
      activity.status.toLowerCase().includes(query)
    );
  });

  paginatedActivities = computed(() => {
    const filtered = this.filteredActivities();
    const pageIndex = this.currentPageIndex();
    const size = this.pageSize();
    const startIdx = pageIndex * size;
    const endIdx = startIdx + size;
    return filtered.slice(startIdx, endIdx);
  });

  onSearch(query: string): void {
    this.searchQuery.set(query);
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  onClearFilters(): void {
    this.searchQuery.set('');
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'CUMPLIDO':
        return 'status-cumplido';
      case 'EN_PROGRESO':
        return 'status-en-progreso';
      case 'PENDIENTE':
        return 'status-pendiente';
      default:
        return 'status-pendiente';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'CUMPLIDO':
        return 'Cumplido';
      case 'EN_PROGRESO':
        return 'En Progreso';
      case 'PENDIENTE':
        return 'Pendiente';
      default:
        return 'Pendiente';
    }
  }
}
