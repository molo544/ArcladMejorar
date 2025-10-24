# 📖 Documentación Técnica - Arclad App

## Índice
1. [Flujo de Autenticación](#flujo-de-autenticación)
2. [Sistema de Traducciones](#sistema-de-traducciones)
3. [Gestión de Estado con Signals](#gestión-de-estado-con-signals)
4. [Interceptores HTTP](#interceptores-http)
5. [Guards y Protección de Rutas](#guards-y-protección-de-rutas)
6. [Formularios Reactivos](#formularios-reactivos)
7. [CRUD de Alertas](#crud-de-alertas)

---

## 🔐 Flujo de Autenticación

### Diagrama de Flujo

```
Usuario → Login Form → AuthService → API
                          ↓
                    LocalStorage (token)
                          ↓
                    Signal (currentUser)
                          ↓
                    Dashboard Protected
```

### Implementación

```typescript
// 1. Usuario ingresa credenciales en login-form.component.ts
onSubmit() {
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => this.toastr.error('Credenciales inválidas')
    });
  }
}

// 2. AuthService maneja la petición
login(credentials: LoginCredentials): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
    credentials
  ).pipe(
    tap((response) => {
      // Guardar en localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      
      // Actualizar signals
      this.currentUser.set(response.user);
      this.isAuthenticated.set(true);
    })
  );
}

// 3. AuthInterceptor añade el token automáticamente
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};

// 4. AuthGuard protege las rutas
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isAuthenticated() 
    ? true 
    : router.createUrlTree(['/auth/login']);
};
```

---

## 🌍 Sistema de Traducciones

### Configuración

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
```

### Uso en Componentes

```typescript
// 1. Importar TranslateModule
@Component({
  standalone: true,
  imports: [TranslateModule]
})

// 2. Uso en template
<h1>{{ 'AUTH.LOGIN' | translate }}</h1>
<p>{{ 'VALIDATION.REQUIRED' | translate }}</p>

// 3. Uso programático
constructor(private i18nService: I18nService) {}

getMessage() {
  return this.i18nService.getTranslation('COMMON.SUCCESS');
}
```

### Cambiar Idioma

```typescript
// language-switcher.component.ts
@Component({
  selector: 'app-language-switcher',
  template: `
    <button (click)="changeLanguage('es')">🇪🇸 ES</button>
    <button (click)="changeLanguage('en')">🇺🇸 EN</button>
  `
})
export class LanguageSwitcherComponent {
  private i18nService = inject(I18nService);
  
  changeLanguage(lang: string) {
    this.i18nService.setLanguage(lang);
  }
}
```

---

## ⚡ Gestión de Estado con Signals

### Por qué Signals?

- ✅ **Mejor Performance**: No necesita Zone.js
- ✅ **Más Simple**: Menos boilerplate que RxJS
- ✅ **Type-Safe**: TypeScript completo
- ✅ **Reactivo**: Actualización automática del UI

### Ejemplo Práctico

```typescript
// alerts.store.ts
import { signal, computed } from '@angular/core';

export class AlertsStore {
  // State
  private alertsSignal = signal<Alert[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  
  // Computed (derivados)
  alerts = this.alertsSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();
  error = this.errorSignal.asReadonly();
  
  alertsCount = computed(() => this.alertsSignal().length);
  activeAlerts = computed(() => 
    this.alertsSignal().filter(a => a.status === 'ACTIVE')
  );
  
  // Actions
  setAlerts(alerts: Alert[]) {
    this.alertsSignal.set(alerts);
  }
  
  addAlert(alert: Alert) {
    this.alertsSignal.update(alerts => [...alerts, alert]);
  }
  
  removeAlert(id: string) {
    this.alertsSignal.update(alerts => 
      alerts.filter(a => a.id !== id)
    );
  }
  
  setLoading(loading: boolean) {
    this.loadingSignal.set(loading);
  }
}

// Uso en componente
@Component({
  template: `
    <div>Total: {{ store.alertsCount() }}</div>
    <div>Activas: {{ store.activeAlerts().length }}</div>
    
    @if (store.loading()) {
      <p>Cargando...</p>
    }
    
    @for (alert of store.alerts(); track alert.id) {
      <div>{{ alert.name }}</div>
    }
  `
})
export class AlertListComponent {
  store = inject(AlertsStore);
}
```

---

## 🔄 Interceptores HTTP

### Auth Interceptor

Añade automáticamente el token a todas las peticiones:

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
```

### Error Interceptor

Maneja errores HTTP globalmente:

```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error';

      switch (error.status) {
        case 401:
          errorMessage = 'No autorizado';
          router.navigate(['/auth/login']);
          break;
        case 403:
          errorMessage = 'Sin permisos';
          break;
        case 404:
          errorMessage = 'No encontrado';
          break;
        case 500:
          errorMessage = 'Error del servidor';
          break;
      }

      toastr.error(errorMessage);
      return throwError(() => error);
    })
  );
};
```

---

## 🛡️ Guards y Protección de Rutas

### Auth Guard (Rutas Privadas)

```typescript
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};

// Uso en rutas
const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/pages/home-page')
  }
];
```

### Public Guard (Rutas Públicas)

```typescript
export const publicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si ya está autenticado, redirige al dashboard
  if (!authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};

// Uso en rutas
const routes: Routes = [
  {
    path: 'auth/login',
    canActivate: [publicGuard],
    loadComponent: () => import('./features/auth/pages/login-page')
  }
];
```

### Role Guard (Por Roles)

```typescript
export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.currentUser();

    if (user && allowedRoles.includes(user.role)) {
      return true;
    }

    return router.createUrlTree(['/unauthorized']);
  };
};

// Uso
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [roleGuard([UserRole.ADMIN])],
    loadComponent: () => import('./features/admin/admin-page')
  }
];
```

---

## 📝 Formularios Reactivos

### Ejemplo Completo: Login Form

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  // Formulario con validaciones
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  // Signal para controlar el estado de carga
  isLoading = signal(false);

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.toastr.success('Inicio de sesión exitoso');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.toastr.error('Credenciales inválidas');
      }
    });
  }

  // Helpers para el template
  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Email inválido';
    }
    if (control?.hasError('minlength')) {
      return 'Mínimo 6 caracteres';
    }
    
    return '';
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control?.invalid && control?.touched);
  }
}
```

### Template del Formulario

```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <!-- Email -->
  <mat-form-field appearance="outline" class="full-width">
    <mat-label>{{ 'AUTH.EMAIL' | translate }}</mat-label>
    <input matInput formControlName="email" type="email">
    
    @if (isFieldInvalid('email')) {
      <mat-error>{{ getErrorMessage('email') }}</mat-error>
    }
  </mat-form-field>

  <!-- Password -->
  <mat-form-field appearance="outline" class="full-width">
    <mat-label>{{ 'AUTH.PASSWORD' | translate }}</mat-label>
    <input matInput formControlName="password" type="password">
    
    @if (isFieldInvalid('password')) {
      <mat-error>{{ getErrorMessage('password') }}</mat-error>
    }
  </mat-form-field>

  <!-- Remember Me -->
  <mat-checkbox formControlName="rememberMe">
    {{ 'AUTH.REMEMBER_ME' | translate }}
  </mat-checkbox>

  <!-- Submit Button -->
  <button 
    mat-raised-button 
    color="primary" 
    type="submit"
    [disabled]="isLoading()">
    @if (isLoading()) {
      <mat-spinner diameter="20"></mat-spinner>
    } @else {
      {{ 'AUTH.LOGIN_BUTTON' | translate }}
    }
  </button>
</form>
```

---

## 🚨 CRUD de Alertas

### Service

```typescript
@Injectable({ providedIn: 'root' })
export class AlertsService {
  private http = inject(HttpClient);
  private baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALERTS.BASE}`;

  getAll(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.baseUrl);
  }

  getById(id: string): Observable<Alert> {
    return this.http.get<Alert>(`${this.baseUrl}/${id}`);
  }

  create(alert: AlertFormData): Observable<Alert> {
    return this.http.post<Alert>(this.baseUrl, alert);
  }

  update(id: string, alert: AlertFormData): Observable<Alert> {
    return this.http.put<Alert>(`${this.baseUrl}/${id}`, alert);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
```

### Component con Store

```typescript
@Component({
  selector: 'app-alert-list',
  standalone: true,
  template: `
    @if (store.loading()) {
      <mat-spinner></mat-spinner>
    } @else {
      <table mat-table [dataSource]="store.alerts()">
        <!-- Columnas -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell *matCellDef="let alert">{{ alert.name }}</td>
        </ng-container>

        <!-- ... más columnas ... -->

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    }
  `
})
export class AlertListComponent implements OnInit {
  private alertsService = inject(AlertsService);
  store = inject(AlertsStore);

  displayedColumns = ['name', 'type', 'priority', 'status', 'actions'];

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.store.setLoading(true);
    
    this.alertsService.getAll().subscribe({
      next: (alerts) => {
        this.store.setAlerts(alerts);
        this.store.setLoading(false);
      },
      error: (error) => {
        this.store.setError('Error al cargar alertas');
        this.store.setLoading(false);
      }
    });
  }

  deleteAlert(id: string): void {
    if (confirm('¿Eliminar alerta?')) {
      this.alertsService.delete(id).subscribe({
        next: () => {
          this.store.removeAlert(id);
          this.toastr.success('Alerta eliminada');
        }
      });
    }
  }
}
```

---

## 🎨 Theming con Angular Material

```scss
// styles.scss
@use '@angular/material' as mat;

// Definir paletas personalizadas
$arclad-primary: mat.define-palette(mat.$indigo-palette);
$arclad-accent: mat.define-palette(mat.$pink-palette);
$arclad-warn: mat.define-palette(mat.$red-palette);

// Crear tema
$arclad-theme: mat.define-light-theme((
  color: (
    primary: $arclad-primary,
    accent: $arclad-accent,
    warn: $arclad-warn,
  )
));

// Aplicar tema
@include mat.all-component-themes($arclad-theme);
```

---

## 📱 Responsive Design

```scss
// Usar PrimeFlex
<div class="grid">
  <div class="col-12 md:col-6 lg:col-4">
    <!-- Contenido -->
  </div>
</div>

// O Media Queries SCSS
@mixin mobile {
  @media (max-width: 768px) {
    @content;
  }
}

.sidebar {
  width: 250px;
  
  @include mobile {
    width: 100%;
  }
}
```

---

**¿Necesitas más detalles sobre algún tema específico?**
