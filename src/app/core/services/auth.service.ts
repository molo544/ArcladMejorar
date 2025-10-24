import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_CONFIG, STORAGE_KEYS } from '../constants/api.config';
import { User, AuthResponse, LoginCredentials } from '../../shared/models/user.model';

/**
 * Servicio de autenticación con manejo de estado mediante Signals
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Signals para manejo de estado
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor() {
    this.loadUserFromStorage();
  }

  /**
   * Carga el usuario desde localStorage al iniciar
   */
  private loadUserFromStorage(): void {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  /**
   * Inicia sesión con credenciales
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.isLoading.set(true);

    return this.http.post<AuthResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
      credentials
    ).pipe(
      tap((response) => {
        this.setAuth(response);
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    this.clearAuth();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Establece la autenticación en el sistema
   */
  private setAuth(response: AuthResponse): void {
    localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

    this.currentUser.set(response.user);
    this.isAuthenticated.set(true);
  }

  /**
   * Limpia toda la información de autenticación
   */
  private clearAuth(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  /**
   * Obtiene el token actual
   */
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user ? user.role === role : false;
  }
}
