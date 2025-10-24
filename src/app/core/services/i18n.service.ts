import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { STORAGE_KEYS, DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES } from '../constants/api.config';

/**
 * Servicio para gestionar el idioma de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private translateService = inject(TranslateService);
  
  // Signal para el idioma actual
  currentLanguage = signal<string>(DEFAULT_LANGUAGE);

  constructor() {
    this.initializeLanguage();
  }

  /**
   * Inicializa el idioma desde localStorage o usa el default
   */
  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    const languageToUse = savedLanguage && AVAILABLE_LANGUAGES.includes(savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;

    this.translateService.setDefaultLang(DEFAULT_LANGUAGE);
    this.translateService.addLangs(AVAILABLE_LANGUAGES);
    this.setLanguage(languageToUse);
  }

  /**
   * Cambia el idioma de la aplicación
   */
  setLanguage(language: string): void {
    if (!AVAILABLE_LANGUAGES.includes(language)) {
      console.warn(`Language ${language} not available, using default`);
      language = DEFAULT_LANGUAGE;
    }

    this.translateService.use(language);
    this.currentLanguage.set(language);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = language;
  }

  /**
   * Obtiene la traducción de una clave
   */
  getTranslation(key: string, params?: object): string {
    return this.translateService.instant(key, params);
  }

  /**
   * Obtiene todos los idiomas disponibles
   */
  getAvailableLanguages(): string[] {
    return AVAILABLE_LANGUAGES;
  }
}
