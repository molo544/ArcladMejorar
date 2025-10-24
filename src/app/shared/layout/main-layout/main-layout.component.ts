import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

interface MenuItem {
  icon: string;
  labelKey: string;
  route?: string;
  subitems?: MenuItem[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    LanguageSelectorComponent,
    TranslateModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals
  isMobile = signal(false);
  sidenavOpened = signal(true);
  expandedMenus = signal<{ [key: string]: boolean }>({});

  // Usuario actual
  currentUser = this.authService.currentUser;

  // Menú items con jerarquía
  menuItems: MenuItem[] = [
    { icon: 'home', labelKey: 'MENU.HOME', route: '/dashboard' },
    {
      icon: 'check_circle',
      labelKey: 'MENU.ACTIVITIES',
      subitems: [
        { icon: 'description', labelKey: 'MENU.ACTIONS', route: '/activities/actions' },
        { icon: 'checklist', labelKey: 'MENU.ACTIVITIES_LIST' }
      ]
    },
    { icon: 'bar_chart', labelKey: 'MENU.STATISTICS', route: '/statistics' },
    {
      icon: 'folder_open',
      labelKey: 'MENU.MASTERS',
      subitems: [
        { icon: 'apartment', labelKey: 'MENU.BRANCHES', route: '/branches' },
        { icon: 'settings', labelKey: 'MENU.PROCESSES', route: '/processes' },
        { icon: 'bar_chart', labelKey: 'MENU.TYPE', route: '/type' },
        { icon: 'assignment_turned_in', labelKey: 'MENU.SOURCE', route: '/source' },
        { icon: 'place', labelKey: 'MENU.LOCATION', route: '/location' },
        { icon: 'person', labelKey: 'MENU.POSITIONS', route: '/positions' },
        { icon: 'group', labelKey: 'MENU.USERS', route: '/users' },
        { icon: 'rule', labelKey: 'MENU.CLOSURE_CRITERIA', route: '/closure-criteria' },
        { icon: 'schedule', labelKey: 'MENU.PARAMETERS', route: '/parameters' }
      ]
    },
    { icon: 'notifications', labelKey: 'MENU.ALERTS', route: '/alerts' },
    { icon: 'lock', labelKey: 'MENU.SECURITY', route: '/security' }
  ];

  // Menu item de configuración (va al final)
  settingsItem: MenuItem = { icon: 'settings', labelKey: 'MENU.SETTINGS', route: '/settings' };

  constructor() {
    // Observar cambios de breakpoint para responsive
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile.set(result.matches);
        this.sidenavOpened.set(!result.matches);
      });
  }

  toggleSidenav(): void {
    this.sidenavOpened.set(!this.sidenavOpened());
  }

  toggleMenu(item: MenuItem): void {
    if (item.subitems && item.subitems.length > 0) {
      const key = item.labelKey;
      const currentState = this.expandedMenus();
      this.expandedMenus.set({
        ...currentState,
        [key]: !currentState[key]
      });
    }
  }

  isMenuExpanded(item: MenuItem): boolean {
    return this.expandedMenus()[item.labelKey] || false;
  }

  /**
   * Verifica si algún submenú está activo
   */
  hasActiveSubmenu(item: MenuItem): boolean {
    if (!item.subitems || item.subitems.length === 0) {
      return false;
    }

    const currentUrl = this.router.url;
    return item.subitems.some(subitem =>
      subitem.route && currentUrl.startsWith(subitem.route)
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  /**
   * Obtiene las iniciales del usuario
   */
  getUserInitials(): string {
    const user = this.currentUser();
    if (!user) return 'U';

    const firstInitial = user.firstName?.charAt(0).toUpperCase() || '';
    const lastInitial = user.lastName?.charAt(0).toUpperCase() || '';

    return firstInitial + lastInitial;
  }

  /**
   * Obtiene el nombre completo del usuario
   */
  getUserFullName(): string {
    const user = this.currentUser();
    if (!user) return 'Usuario';

    return `${user.firstName} ${user.lastName}`;
  }

  /**
   * Obtiene el rol del usuario formateado
   */
  getUserRole(): string {
    const user = this.currentUser();
    if (!user) return '';

    const roleMap: { [key: string]: string } = {
      'ADMIN': 'Administrador',
      'USER': 'Usuario',
      'VIEWER': 'Visualizador'
    };

    return roleMap[user.role] || user.role;
  }

  /**
   * Cierra el sidenav si está en modo mobile
   */
  closeSidenavIfMobile(): void {
    if (this.isMobile()) {
      this.sidenavOpened.set(false);
    }
  }
}

