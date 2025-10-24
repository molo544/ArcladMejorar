import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  @Input() reportData: any;

  // Datos del header del reporte
  headerInfo = {
    title: 'ACCIÓN CORRECTIVA',
    subtitle: 'METODOLOGÍA 8D',
    fechaCreacion: '29/09/2025',
    codigo: 'CTG-AC-SO-0349',
    predecesora: '',
    tipo: 'CORRECTIVA',
    fuente: 'NC AUDITORIA EXTERNA'
  };

  // Información de control de criterios
  controlInfo = {
    lider: 'VALENTINA ESCOBAR DÁVILA',
    cargo: 'ASISTENCIA SOSTENIBILIDAD',
    equipo: 'D1 - EQUIPO',
    direccion: 'DIRECCIÓN SOSTENIBILIDAD-ANA LUCIA RUIZ RUIZ,AUXILIAR SOSTENIBILIDAD-LEIDY VANESSA VERGARA CRECIÁN'
  };

  // Secciones del reporte
  sections = [
    {
      id: 'problema',
      title: 'Problema',
      icon: 'error_outline',
      iconColor: '#22c55e',
      content: 'Se ha detectado una variabilidad inconsistente en el adhesivo del producto X, lo que ha provocado quejas de clientes por fallas de adhesión en condiciones de alta humedad. El problema afecta aproximadamente al 15% de la producción del lote 123, generando un riesgo de devoluciones masivas y daño a la reputación de la marca.'
    },
    {
      id: 'requisito',
      title: 'Requisito Incumplido',
      icon: 'rule',
      iconColor: '#22c55e',
      items: [
        {
          norma: 'ISO 9001',
          numero: '8.5.2 - Identificación y Trazabilidad',
          descripcion: 'No se está asegurando la trazabilidad completa de los componentes de la materia prima, dificultando la identificación del origen de la variabilidad.'
        }
      ]
    },
    {
      id: 'correccion',
      title: 'Corrección Aplicada',
      icon: 'build_circle',
      iconColor: '#22c55e',
      activities: [
        {
          actividad: 'Ajustar parámetros de la máquina X.',
          responsable: 'J. Pérez',
          estado: 'Completado'
        },
        {
          actividad: 'Inspeccionar lote de producción 123.',
          responsable: 'A. Rodríguez',
          estado: 'Completado'
        }
      ]
    },
    {
      id: 'analisis',
      title: 'Análisis de Causa',
      icon: 'analytics',
      iconColor: '#22c55e',
      causasIdentificadas: [
        { categoria: 'Método', causa: 'Falta de procedimiento estandarizado.' },
        { categoria: 'Mano de Obra', causa: 'Falta de capacitación específica.' },
        { categoria: 'Materiales', causa: 'Variabilidad en la materia prima.' },
        { categoria: 'Máquinas', causa: 'Mantenimiento preventivo inadecuado.' }
      ],
      causaFundamental: 'El mantenimiento preventivo del equipo de mezcla es inadecuado, lo que genera inconsistencias en la dosificación del aditivo clave.'
    }
  ];
}
