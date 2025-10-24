import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../../../../shared/components/language-selector/language-selector.component';
import { UserRole } from '../../../../core/enums/app.enums';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule,
    LanguageSelectorComponent
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  // Signals para el estado
  isLoading = signal(false);
  hidePassword = signal(true);

  // Formulario reactivo
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  /**
   * Maneja el envío del formulario de login
   */
  onSubmit(): void {
    // Por ahora permitir login sin validaciones para desarrollo
    this.isLoading.set(true);

    // Simulación temporal: establecer autenticación manualmente
    setTimeout(() => {
      // Crear un usuario mock y guardarlo
      const mockUser = {
        id: '1',
        email: 'admin@arclad.com',
        firstName: 'Admin',
        lastName: 'Arclad',
        role: UserRole.ADMIN
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Guardar en localStorage para que el AuthService lo reconozca
      localStorage.setItem('arclad_token', mockToken);
      localStorage.setItem('arclad_refresh_token', mockToken);
      localStorage.setItem('arclad_user', JSON.stringify(mockUser));
      
      // Actualizar el estado del AuthService
      this.authService['currentUser'].set(mockUser);
      this.authService['isAuthenticated'].set(true);
      
      this.isLoading.set(false);
      
      // Redirigir al dashboard
      this.router.navigate(['/dashboard']);
    }, 800);
  }

  /**
   * Obtiene el mensaje de error para un campo
   */
  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    
    if (control?.hasError('required')) {
      return this.translate.instant('VALIDATION.REQUIRED');
    }
    if (control?.hasError('email')) {
      return this.translate.instant('VALIDATION.EMAIL');
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return this.translate.instant('VALIDATION.MIN_LENGTH', { min: minLength });
    }
    
    return '';
  }

  /**
   * Verifica si un campo es inválido
   */
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.hidePassword.set(!this.hidePassword());
  }
}
