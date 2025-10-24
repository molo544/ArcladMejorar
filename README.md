# 🚀 Arclad App - Sistema de Gestión de Alertas

![Angular](https://img.shields.io/badge/Angular-20.x-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Material](https://img.shields.io/badge/Material-20.x-purple)
![License](https://img.shields.io/badge/License-MIT-green)

Sistema empresarial desarrollado con Angular 20, Angular Material y las mejores prácticas de desarrollo moderno.

---

## 📋 Tabla de Contenido

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Guías de Desarrollo](#-guías-de-desarrollo)
- [Convenciones de Código](#-convenciones-de-código)
- [Testing](#-testing)
- [Despliegue](#-despliegue)

---

## ✨ Características

- ✅ **Multi-idioma (i18n)**: Soporte para Español e Inglés con ngx-translate
- ✅ **Autenticación JWT**: Sistema completo de login y gestión de sesiones
- ✅ **Formularios Reactivos**: Validaciones robustas y tipado fuerte
- ✅ **CRUD de Alertas**: Gestión completa de alertas con paginación y filtros
- ✅ **Dashboard Responsive**: Panel de control adaptable a todos los dispositivos
- ✅ **Menu Lateral**: Navegación intuitiva con Material Sidenav
- ✅ **Notificaciones**: Sistema de toasts para feedback al usuario
- ✅ **Guards y Interceptors**: Protección de rutas y manejo automático de tokens
- ✅ **Lazy Loading**: Carga diferida de módulos para mejor performance
- ✅ **Signals**: Sistema de reactividad moderno de Angular (Zoneless)
- ✅ **TypeScript Strict Mode**: Máxima seguridad de tipos

---

## 🏗️ Arquitectura

Este proyecto sigue una arquitectura modular y escalable basada en las mejores prácticas de Angular:

### Principios de Diseño

1. **Standalone Components**: Sin NgModules, arquitectura moderna
2. **Lazy Loading**: Carga bajo demanda para mejor performance
3. **Signals**: Sistema de reactividad nativo (sin Zone.js)
4. **Separation of Concerns**: Separación clara entre presentación, lógica y datos
5. **DRY (Don't Repeat Yourself)**: Reutilización máxima de componentes
6. **SOLID Principles**: Código mantenible y escalable

### Capas de la Aplicación

```
┌─────────────────────────────────────┐
│         Presentation Layer          │  ← Components, Pages
├─────────────────────────────────────┤
│           Service Layer             │  ← Business Logic
├─────────────────────────────────────┤
│        HTTP/API Layer               │  ← Interceptors, Services
├─────────────────────────────────────┤
│          Core Layer                 │  ← Guards, Constants, Enums
└─────────────────────────────────────┘
```

---

## 🛠️ Tecnologías

### Core
- **Angular 20.3.x** - Framework principal
- **TypeScript 5.7.x** - Lenguaje de programación
- **RxJS 7.8.x** - Programación reactiva

### UI/UX
- **Angular Material 20.x** - Componentes UI siguiendo Material Design
- **PrimeFlex 3.x** - Utilidades CSS (Grid, Flexbox, Spacing)
- **SCSS** - Preprocesador CSS

### Librerías
- **ngx-translate 15.x** - Internacionalización (i18n)
- **ngx-toastr** - Sistema de notificaciones
- **date-fns** - Manipulación de fechas (sin moment.js)

### Herramientas de Desarrollo
- **Angular CLI 20.x** - Herramienta de línea de comandos
- **ESLint** - Linting de código
- **Prettier** - Formateo de código (configurar)

---

## 📦 Instalación

### Prerequisitos

```bash
Node.js >= 24.x
npm >= 11.x
Angular CLI 20.x
```

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd arclad-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Editar src/app/core/constants/api.config.ts
# Configurar BASE_URL de tu API
```

4. **Ejecutar en desarrollo**
```bash
ng serve
# o
npm start
```

5. **Abrir en el navegador**
```
http://localhost:4200
```

---

## 📁 Estructura del Proyecto

```
src/app/
├── core/                          # 🔐 Singleton - Se instancia una sola vez
│   ├── services/                  # Servicios globales
│   │   ├── auth.service.ts        # Autenticación y tokens
│   │   └── i18n.service.ts        # Gestión de idiomas
│   ├── interceptors/              # Interceptores HTTP
│   │   ├── auth.interceptor.ts    # Añade token a requests
│   │   └── error.interceptor.ts   # Manejo global de errores
│   ├── guards/                    # Protección de rutas
│   │   └── auth.guard.ts          # authGuard y publicGuard
│   ├── components/                # Componentes del layout principal
│   │   ├── header/                # Barra superior
│   │   ├── sidebar/               # Menu lateral
│   │   └── footer/                # Pie de página
│   ├── constants/                 # Constantes globales
│   │   └── api.config.ts          # URLs de API, Storage keys
│   └── enums/                     # Enumeraciones
│       └── app.enums.ts           # Roles, Estados, Prioridades
│
├── shared/                        # ♻️ Reutilizable - Componentes sin lógica
│   ├── components/                # Componentes presentacionales
│   │   ├── language-switcher/     # Selector de idioma
│   │   ├── button/                # Botón reutilizable
│   │   └── card/                  # Card reutilizable
│   ├── pipes/                     # Pipes personalizados
│   ├── directives/                # Directivas reutilizables
│   ├── models/                    # Interfaces/Modelos globales
│   │   └── user.model.ts          # User, AuthResponse, LoginCredentials
│   └── utils/                     # Funciones auxiliares
│       └── date.utils.ts          # Helpers para fechas
│
├── features/                      # 🎯 Funcionalidades - Lazy Loaded
│   ├── auth/                      # Módulo de autenticación
│   │   ├── components/
│   │   │   └── login-form/        # Formulario de login reactivo
│   │   ├── pages/
│   │   │   └── login-page/        # Página contenedora del login
│   │   └── auth.routes.ts         # Rutas: /auth/login
│   │
│   ├── dashboard/                 # Módulo del dashboard principal
│   │   ├── components/
│   │   │   └── statistics-widget/ # Widget de estadísticas
│   │   ├── pages/
│   │   │   └── home-page/         # Página principal del dashboard
│   │   └── dashboard.routes.ts    # Rutas: /dashboard
│   │
│   └── alerts/                    # 🚨 Módulo CRUD de Alertas
│       ├── components/
│       │   ├── alert-list/        # Tabla de alertas con paginación
│       │   └── alert-form/        # Formulario crear/editar alerta
│       ├── pages/
│       │   ├── alerts-page/       # Página principal (contiene list)
│       │   └── alert-details-page/ # Página de detalles
│       ├── services/
│       │   └── alerts.service.ts  # CRUD HTTP de alertas
│       ├── models/
│       │   └── alert.model.ts     # Alert, AlertFormData
│       ├── validators/
│       │   └── alert.validators.ts # Validaciones custom
│       ├── store/
│       │   └── alerts.store.ts    # Estado local con Signals
│       └── alerts.routes.ts       # Rutas: /alerts/*
│
├── app.ts                         # Componente raíz (Standalone)
├── app.config.ts                  # ⚙️ Configuración global (Providers)
├── app.routes.ts                  # 🛤️ Routing principal
└── app.scss                       # Estilos del componente raíz

src/assets/
└── i18n/                          # 🌍 Archivos de traducción
    ├── es.json                    # Español
    └── en.json                    # English
```

---

## 📘 Guías de Desarrollo

### 1. Crear un Nuevo Feature

```bash
# 1. Crear estructura de carpetas
mkdir -p src/app/features/mi-feature/{components,pages,services,models}

# 2. Generar componentes
ng g c features/mi-feature/pages/mi-page --standalone

# 3. Crear archivo de rutas
touch src/app/features/mi-feature/mi-feature.routes.ts

# 4. Añadir ruta en app.routes.ts
```

### 2. Crear un Componente Shared

```bash
ng g c shared/components/mi-componente --standalone
```

### 3. Crear un Servicio

```bash
# Core (singleton)
ng g s core/services/mi-servicio

# Feature (específico)
ng g s features/alerts/services/alerts
```

### 4. Añadir Traducciones

```json
// src/assets/i18n/es.json
{
  "MI_MODULO": {
    "TITULO": "Mi Título",
    "MENSAJE": "Mi mensaje"
  }
}
```

Uso en componente:
```typescript
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [TranslateModule],
  template: `<h1>{{ 'MI_MODULO.TITULO' | translate }}</h1>`
})
```

### 5. Proteger una Ruta

```typescript
// En tu archivo de rutas
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./features/admin/admin.routes')
  }
];
```

---

## 📏 Convenciones de Código

### Nomenclatura

- **Archivos**: `kebab-case.component.ts`, `my-service.service.ts`
- **Clases**: `PascalCase` → `UserService`, `AlertComponent`
- **Variables/Métodos**: `camelCase` → `currentUser`, `getUserById()`
- **Constantes**: `UPPER_SNAKE_CASE` → `API_BASE_URL`
- **Interfaces**: `PascalCase` → `User`, `AlertFormData`
- **Enums**: `PascalCase` → `UserRole`, `AlertStatus`

### Estructura de Componentes

```typescript
@Component({
  selector: 'app-mi-componente',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './mi-componente.html',
  styleUrl: './mi-componente.scss'
})
export class MiComponente {
  // 1. Signals
  count = signal(0);
  
  // 2. Inputs/Outputs
  @Input() data!: string;
  @Output() evento = new EventEmitter();
  
  // 3. Servicios (inject)
  private authService = inject(AuthService);
  
  // 4. Lifecycle hooks
  ngOnInit() {}
  
  // 5. Métodos públicos
  onClick() {}
  
  // 6. Métodos privados
  private helper() {}
}
```

### Comentarios JSDoc

```typescript
/**
 * Crea una nueva alerta en el sistema
 * @param alert - Datos de la alerta a crear
 * @returns Observable con la alerta creada
 */
createAlert(alert: AlertFormData): Observable<Alert> {
  return this.http.post<Alert>(`${API_URL}/alerts`, alert);
}
```

---

## 🧪 Testing

```bash
# Ejecutar todos los tests
ng test

# Tests con coverage
ng test --code-coverage

# Tests de un archivo específico
ng test --include='**/auth.service.spec.ts'
```

### Ejemplo de Test

```typescript
describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user', () => {
    const credentials = { email: 'test@test.com', password: '123' };
    service.login(credentials).subscribe(response => {
      expect(response.token).toBeDefined();
    });
  });
});
```

---

## 🚀 Despliegue

### Build para Producción

```bash
# Build optimizado
ng build --configuration production

# Los archivos se generan en dist/
```

### Variables de Entorno

Crear archivos de configuración por ambiente:

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.arclad.com'
};
```

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Angular Docs](https://angular.dev)
- [Angular Material](https://material.angular.dev)
- [RxJS](https://rxjs.dev)
- [ngx-translate](https://github.com/ngx-translate/core)

### Guías de Estilo
- [Angular Style Guide](https://angular.dev/style-guide)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

## 👥 Equipo de Desarrollo

Para dudas o sugerencias, contactar al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es propiedad de **Arclad** y está protegido por las leyes de derechos de autor aplicables.

---

**Desarrollado con ❤️ usando Angular 20 y las mejores prácticas de la industria**
