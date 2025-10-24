import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/services/i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('arclad-app');
  private i18nService = inject(I18nService);

  constructor() {
    // El I18nService se inicializa aquí automáticamente
  }
}
