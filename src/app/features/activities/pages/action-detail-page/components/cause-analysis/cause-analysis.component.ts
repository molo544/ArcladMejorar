import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CauseItem {
  description: string;
}

interface CauseCategory {
  title: string;
  items: CauseItem[];
}

@Component({
  selector: 'app-cause-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cause-analysis.component.html',
  styleUrl: './cause-analysis.component.scss'
})
export class CauseAnalysisComponent {
  @Input() analisisDeCausa: string = '';

  categories: CauseCategory[] = [
    {
      title: 'Método',
      items: [
        { description: 'Falta de procedimiento estandarizado.' },
        { description: 'Instrucciones de trabajo no claras.' }
      ]
    },
    {
      title: 'Mano de Obra',
      items: [
        { description: 'Falta de capacitación específica.' },
        { description: 'Fatiga del operador.' }
      ]
    },
    {
      title: 'Materiales',
      items: [
        { description: 'Variabilidad en la materia prima.' },
        { description: 'Proveedor no calificado.' }
      ]
    },
    {
      title: 'Máquinas',
      items: [
        { description: 'Mantenimiento preventivo inadecuado.' },
        { description: 'Equipo descalibrado.' }
      ]
    },
    {
      title: 'Medio Ambiente',
      items: [
        { description: 'Condiciones de iluminación deficientes.' },
        { description: 'Exceso de ruido en el área.' }
      ]
    },
    {
      title: 'Medición',
      items: [
        { description: 'Instrumentos de medición inadecuados.' },
        { description: 'Error en la toma de muestras.' }
      ]
    }
  ];
}
