import { Component, inject, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ProblemFormComponent } from './components/problem-form/problem-form.component';
import { RequirementFormComponent } from './components/requirement-form/requirement-form.component';
import { CorrectionTableComponent } from './components/correction-table/correction-table.component';
import { CauseAnalysisComponent } from './components/cause-analysis/cause-analysis.component';
import { RootCauseComponent } from './components/root-cause/root-cause.component';
import { ImplementationTableComponent } from './components/implementation-table/implementation-table.component';
import { ReportComponent } from './components/report/report.component';

interface ActionDetail {
  id: string;
  codigo: string;
  nombreAccion: string;
  responsable: string;
  fechaApertura: string;
  fuente: string;
  fechaCumplimiento?: string;
  estado: 'IMPLEMENTACION' | 'EN_PROCESO' | 'COMPLETADA' | 'CANCELADA';
  descripcion?: string;
  observaciones?: string;
  prioridad?: 'ALTA' | 'MEDIA' | 'BAJA';
  categoria?: string;
  fechaCreacion?: string;
  creadoPor?: string;
  ultimaModificacion?: string;
  modificadoPor?: string;
  // Campos para el tab de Definición
  problema?: string;
  requisito?: string;
  correccion?: string;
  analisisCausa?: string;
  causaFundamental?: string;
}

interface A8DSection {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-action-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule,
    ProblemFormComponent,
    RequirementFormComponent,
    CorrectionTableComponent,
    CauseAnalysisComponent,
    RootCauseComponent,
    ImplementationTableComponent,
    ReportComponent
  ],
  templateUrl: './action-detail-page.html',
  styleUrls: ['./action-detail-page.scss']
})
export class ActionDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  actionDetail = signal<ActionDetail | null>(null);
  loading = signal(true);
  selectedTabIndex = signal(0);

  // Navegación A8D
  showFloatingMenu = signal(false);
  activeSection = signal('problema');

  a8dSections: A8DSection[] = [
    { id: 'problema', title: 'Problema', icon: 'error_outline' },
    { id: 'requisito', title: 'Requisito', icon: 'fact_check' },
    { id: 'correccion', title: 'Corrección', icon: 'build' },
    { id: 'analisis', title: 'Análisis de Causa', icon: 'troubleshoot' },
    { id: 'causa-fundamental', title: 'Causa Fundamental', icon: 'search' }
  ];

  // Data mockeada completa
  private mockActions: ActionDetail[] = [
    {
      id: '1',
      codigo: 'RNG-AC-CO-0350',
      nombreAccion: 'CRITERIOS DE CALIDAD Y AMBIENTALES',
      responsable: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      fechaApertura: '03/10/2025',
      fuente: 'NC AUDITORIA EXTERNA',
      fechaCumplimiento: '03/10/2025',
      estado: 'IMPLEMENTACION',
      descripcion: 'Implementar criterios de calidad y ambientales según los estándares establecidos por la auditoría externa. Se debe revisar y actualizar toda la documentación relacionada con los procesos de calidad.',
      observaciones: 'Pendiente revisión de documentación técnica por parte del equipo de calidad.',
      prioridad: 'ALTA',
      categoria: 'Calidad y Medio Ambiente',
      fechaCreacion: '01/10/2025',
      creadoPor: 'Sistema de Auditoría',
      ultimaModificacion: '03/10/2025',
      modificadoPor: 'JOSE ALEJANDRO HOLGUIN VALENCIA',
      problema: 'Descripción detallada del problema o la oportunidad que se abordará con esta acción. Incluir antecedentes, contexto y el impacto actual en la organización.',
      requisito: 'Especificación de los requisitos normativos o contractuales que deben cumplirse. Incluir referencias a normas ISO, regulaciones gubernamentales o requisitos del cliente.',
      correccion: 'Descripción de las acciones correctivas inmediatas implementadas para abordar el problema identificado y evitar su recurrencia.',
      analisisCausa: 'Análisis detallado de las causas que originaron el problema, utilizando herramientas como diagrama de Ishikawa, análisis de los 5 porqués, etc.',
      causaFundamental: 'Identificación de la causa raíz fundamental que debe ser eliminada para evitar la recurrencia del problema en el futuro.'
    },
    {
      id: '2',
      codigo: 'CTG-AC-SO-0349',
      nombreAccion: 'CONTROL CRITERIOS DE OPERACIÓN',
      responsable: 'VALENTINA ESCOBAR DAVILA',
      fechaApertura: '29/09/2025',
      fuente: 'NC AUDITORIA EXTERNA',
      fechaCumplimiento: undefined,
      estado: 'IMPLEMENTACION',
      descripcion: 'Establecer controles más rigurosos en los criterios de operación para cumplir con los nuevos estándares de la auditoría externa.',
      observaciones: 'En proceso de implementación. Se requiere capacitación adicional del personal.',
      prioridad: 'MEDIA',
      categoria: 'Operaciones',
      fechaCreacion: '27/09/2025',
      creadoPor: 'Sistema de Auditoría',
      ultimaModificacion: '29/09/2025',
      modificadoPor: 'VALENTINA ESCOBAR DAVILA'
    },
    {
      id: '3',
      codigo: 'RNG-AC-SO-0348',
      nombreAccion: 'ACCIONES REQUISITOS CLIENTES',
      responsable: 'ANA LUCIA RUIZ RUIZ',
      fechaApertura: '29/09/2025',
      fuente: 'NC AUDITORIA EXTERNA',
      fechaCumplimiento: undefined,
      estado: 'IMPLEMENTACION',
      descripcion: 'Revisar y actualizar los procedimientos para el manejo de requisitos específicos de clientes.',
      observaciones: 'Se está trabajando en la actualización de los formularios y procesos.',
      prioridad: 'ALTA',
      categoria: 'Servicio al Cliente',
      fechaCreacion: '27/09/2025',
      creadoPor: 'Sistema de Auditoría',
      ultimaModificacion: '29/09/2025',
      modificadoPor: 'ANA LUCIA RUIZ RUIZ'
    }
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const actionId = params['id'];
      this.loadActionDetail(actionId);
    });

    // Leer el query parameter para el tab
    this.route.queryParams.subscribe(queryParams => {
      const tab = queryParams['tab'];
      if (tab === 'implementacion') {
        this.selectedTabIndex.set(2); // Tab de Implementación es el índice 2
      }
    });
  }

  private loadActionDetail(id: string): void {
    this.loading.set(true);
    
    // Simular carga de datos
    setTimeout(() => {
      const action = this.mockActions.find(a => a.id === id);
      this.actionDetail.set(action || null);
      this.loading.set(false);
    }, 500);
  }

  onEdit(): void {
    const action = this.actionDetail();
    if (action) {
      console.log('Editar acción:', action);
      // Navegar a la página de edición cuando esté implementada
    }
  }

  onBack(): void {
    this.router.navigate(['/activities/actions']);
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

  getPriorityClass(priority: string | undefined): string {
    switch (priority) {
      case 'ALTA':
        return 'priority-alta';
      case 'MEDIA':
        return 'priority-media';
      case 'BAJA':
        return 'priority-baja';
      default:
        return 'priority-media';
    }
  }

  getPriorityLabel(priority: string | undefined): string {
    switch (priority) {
      case 'ALTA':
        return 'Alta';
      case 'MEDIA':
        return 'Media';
      case 'BAJA':
        return 'Baja';
      default:
        return priority || 'Media';
    }
  }

  // Navegación por anclas
  scrollToSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    
    // Pequeño delay para asegurar que el menú se cierra primero
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      console.log('Intentando navegar a:', sectionId, 'Elemento encontrado:', element);
      
      if (element) {
        // Opción 1: Usar scrollIntoView (más compatible)
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
        
        // Ajuste adicional después del scroll para el offset del header
        setTimeout(() => {
          const scrolledY = window.pageYOffset;
          if (scrolledY) {
            window.scrollTo({
              top: scrolledY - 150,
              behavior: 'smooth'
            });
          }
        }, 300);
      } else {
        console.warn('No se encontró el elemento con ID:', sectionId);
      }
    }, 100);
  }

  toggleFloatingMenu(): void {
    this.showFloatingMenu.update(value => !value);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const sections = this.a8dSections.map(s => s.id);
    let currentSection = 'problema';

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          currentSection = sectionId;
          break;
        }
      }
    }

    this.activeSection.set(currentSection);
  }
}
