import { Component, inject, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/services/i18n.service';

interface Language {
  code: string;
  name: string;
  countryCode: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent implements OnInit {
  i18nService = inject(I18nService);

  selectedCountry = 'Colombia'; // Default selection
  isDropdownOpen = false;
  private readonly STORAGE_KEY = 'selected-country';

  languages: Language[] = [
    { code: 'pt', name: 'Brasil', countryCode: 'BR' },
    { code: 'es', name: 'Colombia', countryCode: 'CO' },
    { code: 'es', name: 'México', countryCode: 'MX' },
    { code: 'es', name: 'Perú', countryCode: 'PE' }
  ];

  ngOnInit(): void {
    this.initializeCountrySelection();
  }

  private initializeCountrySelection(): void {
    // Recuperar el país guardado del localStorage
    const savedCountry = localStorage.getItem(this.STORAGE_KEY);
    if (savedCountry && this.languages.find(l => l.name === savedCountry)) {
      this.selectedCountry = savedCountry;
    } else {
      // Si no hay país guardado, determinar el país basado en el idioma actual
      const currentLang = this.i18nService.currentLanguage();
      const countryForLang = this.getCountryForLanguage(currentLang);
      this.selectedCountry = countryForLang;
      // Guardar la selección inicial
      localStorage.setItem(this.STORAGE_KEY, this.selectedCountry);
    }
  }

  private getCountryForLanguage(langCode: string): string {
    // Si es portugués, mostrar Brasil
    if (langCode === 'pt') {
      return 'Brasil';
    }
    // Si es español, mostrar Colombia por defecto
    return 'Colombia';
  }

  toggleDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  onLanguageChange(event: Event, countryName: string): void {
    event.stopPropagation(); // Evitar que el evento se propague

    const language = this.languages.find(l => l.name === countryName);
    if (language) {
      this.selectedCountry = countryName;
      // Guardar la selección en localStorage
      localStorage.setItem(this.STORAGE_KEY, countryName);
      // Cambiar el idioma
      this.i18nService.setLanguage(language.code);
      // Cerrar el dropdown
      this.closeDropdown();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const selector = target.closest('.language-selector');
    if (!selector && this.isDropdownOpen) {
      this.closeDropdown();
    }
  }

  getLanguageName(countryName: string): string {
    const language = this.languages.find(l => l.name === countryName);
    return language ? language.name : countryName;
  }

  // Método para obtener la URL de la bandera SVG
  getFlagUrl(countryName: string): string {
    const language = this.languages.find(l => l.name === countryName);
    if (!language) {
      return '';
    }

    // Usar la ruta de assets donde copiamos las banderas
    return `assets/flags/${language.countryCode}.svg`;
  }

  // Método auxiliar para obtener código de país
  getCountryCode(countryName: string): string {
    const language = this.languages.find(l => l.name === countryName);
    return language ? language.countryCode : countryName.substring(0, 2).toUpperCase();
  }
}
