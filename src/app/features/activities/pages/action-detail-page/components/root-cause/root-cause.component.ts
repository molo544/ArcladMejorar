import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-root-cause',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './root-cause.component.html',
  styleUrl: './root-cause.component.scss'
})
export class RootCauseComponent {
  @Input() causaFundamental: string = '';
}
