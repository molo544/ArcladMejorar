import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-problem-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent {
  @Input() problema: string = '';
}
