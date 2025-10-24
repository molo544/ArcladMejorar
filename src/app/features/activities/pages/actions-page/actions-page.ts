import { Component, inject, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../../../core/services/i18n.service';

interface Action {
  id: string;
  codigo: string;
  nombreAccion: string;
  responsable: string;
  fechaApertura: string;
  fuente: string;
  fechaCumplimiento?: string;
  estado: 'IMPLEMENTACION' | 'EN_PROCESO' | 'COMPLETADA' | 'CANCELADA';
}

@Component({
  selector: 'app-actions-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    TranslateModule
  ],
  templateUrl: './actions-page.html',
  styleUrls: ['./actions-page.scss']
})
export class ActionsPageComponent {
  i18nService = inject(I18nService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Signals para mobile detection
  isMobile = signal(false);
  isTablet = signal(false);

  // Data mockeada basada en la imagen
  private allActions: Action[] = [
    {
      id: '1',
      codigo: 'RNG-AC-CO-0350',
      nombreAccion: 'CRITERIOS DE CALIDAD Y AMBIENTALES',
      responsable: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      fechaApertura: '03/10/2025',
      fuente: 'NC AUDITORIA EXTERNA',
      fechaCumplimiento: '03/10/2025',
      estado: 'IMPLEMENTACION'
    },
    {
      id: '2',
      codigo: 'CTG-AC-SO-0349',
      nombreAccion: 'CONTROL CRITERIOS DE OPERACIÓN',
      responsable: 'VALENTINA ESCOBAR DAVILA',
      fechaApertura: '29/09/2025',
      fuente: 'NC AUDITORIA EXTERNA',
      fechaCumplimiento: undefined,
      estado: 'IMPLEMENTACION'
    },
    {
      id: '3',
      codigo: 'RNG-AC-SO-0348',
      nombreAccion: 'ACCIONES REQUISITOS CLIENTES',
      responsable: 'ANA LUCIA RUIZ RUIZ',
      fechaApertura: '29/09/2025',
      fuente: 'NC AUDITORIA EXTERNA',
      fechaCumplimiento: undefined,
      estado: 'IMPLEMENTACION'
    },
    {
      id: '4',
      codigo: 'RNG-AC-SO-0347',
      nombreAccion: 'OBJETIVIDAD E IMPARCIALIDAD AUDITORIA INTERNA',
      responsable: 'ANA LUCIA RUIZ RUIZ',
      fechaApertura: '29/09/2025',
      fuente: 'NC AUDITORIA EXTERNA',
      fechaCumplimiento: '07/10/2025',
      estado: 'IMPLEMENTACION'
    },
    {
      id: '5',
      codigo: 'CTG-PA-LO-0346',
      nombreAccion: 'DERRAME ADHESIVO ACRÍLICO BODEGA DE LÍQUIDOS',
      responsable: 'LEIDY VANESSA VERGARA CRECÍAN',
      fechaApertura: '26/09/2025',
      fuente: 'INCIDENTE AMBIENTAL',
      fechaCumplimiento: undefined,
      estado: 'IMPLEMENTACION'
    },
    {
      id: '6',
      codigo: 'RNG-PA-SO-0345',
      nombreAccion: 'ENMIENDA CAMBIO CLIMÁTICO',
      responsable: 'ANA LUCIA RUIZ RUIZ',
      fechaApertura: '30/07/2025',
      fuente: 'MEJORA DE PROCESOS',
      fechaCumplimiento: '20/08/2025',
      estado: 'IMPLEMENTACION'
    },
    {
      id: '7',
      codigo: 'RNG-AC-AC-0344',
      nombreAccion: 'PQR CONTAMINACIÓN PRIMER POR 5269 ARMEX',
      responsable: 'DIEGO LEÓN BERMUDEZ',
      fechaApertura: '07/07/2025',
      fuente: 'NOVEDADES DE CLIENTES',
      fechaCumplimiento: '25/08/2025',
      estado: 'IMPLEMENTACION'
    },
    {
      id: '8',
      codigo: 'RNG-AC-AC-0343',
      nombreAccion: 'DESPRENDIMIENTO ETIQUETAS ARM 7171 ARECUADOR IMPRENTA MARISCAL',
      responsable: 'DIEGO LEÓN BERMUDEZ',
      fechaApertura: '15/09/2024',
      fuente: 'NOVEDADES DE CLIENTES',
      fechaCumplimiento: '25/08/2025',
      estado: 'IMPLEMENTACION'
    },
    {
      id: '9',
      codigo: 'RNG-PA-AC-0342',
      nombreAccion: 'AUTOMATIZACIÓN SOLICITUD MUESTRAS A LABORATORIO',
      responsable: 'VERONICA URREGO LAVERDE',
      fechaApertura: '24/06/2025',
      fuente: 'MEJORA DE PROCESOS',
      fechaCumplimiento: '22/08/2025',
      estado: 'IMPLEMENTACION'
    },
    {
      id: '10',
      codigo: 'RNG-AC-SO-0341',
      nombreAccion: 'CONTAMINACIÓN DEL MATERIAL POR OBJETOS EXTRAÑOS',
      responsable: 'VALENTINA ESCOBAR DAVILA',
      fechaApertura: '19/05/2025',
      fuente: 'INOCUIDAD',
      fechaCumplimiento: '09/10/2025',
      estado: 'IMPLEMENTACION'
    }
  ];

  displayedColumns: string[] = ['codigo', 'nombreAccion', 'responsable', 'fechaApertura', 'fuente', 'fechaCumplimiento', 'estado', 'actions'];
  
  // Signals
  searchQuery = signal('');
  currentPageIndex = signal(0);
  pageSize = signal(5);

  constructor() {
    // Detectar tamaño inicial con breakpoint personalizado
    const customMobileBreakpoint = '(max-width: 768px)';
    const customTabletBreakpoint = '(min-width: 769px) and (max-width: 1024px)';
    
    const initialMobile = this.breakpointObserver.isMatched(customMobileBreakpoint);
    const initialTablet = this.breakpointObserver.isMatched(customTabletBreakpoint);
    
    this.isMobile.set(initialMobile);
    this.isTablet.set(initialTablet);
    
    // Observar cambios de breakpoints para responsive
    this.breakpointObserver
      .observe([customMobileBreakpoint, customTabletBreakpoint])
      .subscribe(result => {
        const breakpoints = result.breakpoints;
        this.isMobile.set(!!breakpoints[customMobileBreakpoint]);
        this.isTablet.set(!!breakpoints[customTabletBreakpoint]);
      });
  }
  
  // Computed
  filteredActions = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      return this.allActions;
    }
    
    return this.allActions.filter(action =>
      action.codigo.toLowerCase().includes(query) ||
      action.nombreAccion.toLowerCase().includes(query) ||
      action.responsable.toLowerCase().includes(query) ||
      action.fuente.toLowerCase().includes(query) ||
      action.estado.toLowerCase().includes(query)
    );
  });

  paginatedActions = computed(() => {
    const filtered = this.filteredActions();
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

  onAddAction(): void {
    console.log('Agregar nueva acción');
  }

  onEditAction(action: Action): void {
    console.log('Editar acción:', action);
  }

  onDeleteAction(action: Action): void {
    console.log('Eliminar acción:', action);
  }

  onViewActionDetail(action: Action): void {
    this.router.navigate(['/activities/actions', action.id]);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'IMPLEMENTACION':
        return 'status-implementacion';
      case 'EN_PROCESO':
        return 'status-en-proceso';
      case 'COMPLETADA':
        return 'status-completada';
      case 'CANCELADA':
        return 'status-cancelada';
      default:
        return 'status-implementacion';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'IMPLEMENTACION':
        return 'Implementación';
      case 'EN_PROCESO':
        return 'En Proceso';
      case 'COMPLETADA':
        return 'Completada';
      case 'CANCELADA':
        return 'Cancelada';
      default:
        return status;
    }
  }
}
