import { Component, inject, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../../../core/services/i18n.service';
import { BranchDialogComponent } from '../../components/branch-dialog/branch-dialog.component';

interface Branch {
  id: string;
  name: string;
  status: 'Activo' | 'Inactivo';
  countryCode: string; // Código de país para la bandera (BR, CO, MX, PE)
}

@Component({
  selector: 'app-branches-list-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    TranslateModule
  ],
  templateUrl: './branches-list-page.html',
  styleUrls: ['./branches-list-page.scss']
})
export class BranchesListPageComponent {
  i18nService = inject(I18nService);
  dialog = inject(MatDialog);
  private breakpointObserver = inject(BreakpointObserver);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Signals para mobile detection
  isMobile = signal(false);
  isTablet = signal(false);

  // Data - datos originales restaurados correctamente
  private allBranches: Branch[] = [
    {
      id: '1',
      name: 'Brasil',
      status: 'Activo',
      countryCode: 'BR'
    },
    {
      id: '2',
      name: 'Colombia',
      status: 'Activo',
      countryCode: 'CO'
    },
    {
      id: '3',
      name: 'México',
      status: 'Activo',
      countryCode: 'MX'
    },
    {
      id: '4',
      name: 'Perú',
      status: 'Inactivo',
      countryCode: 'PE'
    }
  ];

  displayedColumns: string[] = ['name', 'status', 'actions'];

  // Signals
  searchQuery = signal('');
  currentPageIndex = signal(0);
  pageSize = signal(5);

  constructor() {
    // Detectar tamaño inicial con breakpoint personalizado
    const customMobileBreakpoint = '(max-width: 768px)';
    const customTabletBreakpoint = '(min-width: 769px) and (max-width: 1024px)';

    const initialMobile = this.breakpointObserver.isMatched(customMobileBreakpoint);
    const initialTablet = this.breakpointObserver.isMatched(customTabletBreakpoint);

    this.isMobile.set(initialMobile);
    this.isTablet.set(initialTablet);

    // Observar cambios de breakpoints para responsive
    this.breakpointObserver
      .observe([customMobileBreakpoint, customTabletBreakpoint])
      .subscribe(result => {
        const breakpoints = result.breakpoints;
        this.isMobile.set(!!breakpoints[customMobileBreakpoint]);
        this.isTablet.set(!!breakpoints[customTabletBreakpoint]);
      });
  }

  // Computed
  filteredBranches = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      return this.allBranches;
    }

    return this.allBranches.filter(branch =>
      branch.name.toLowerCase().includes(query) ||
      branch.status.toLowerCase().includes(query)
    );
  });

  paginatedBranches = computed(() => {
    const filtered = this.filteredBranches();
    const pageIndex = this.currentPageIndex();
    const size = this.pageSize();
    const startIdx = pageIndex * size;
    const endIdx = startIdx + size;
    return filtered.slice(startIdx, endIdx);
  });

  onSearch(query: string): void {
    this.searchQuery.set(query);
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  onClearFilters(): void {
    this.searchQuery.set('');
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onAddBranch(): void {
    this.dialog.open(BranchDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { isEdit: false }
    }).afterClosed().subscribe((result: any) => {
      if (result) {
        // Agregar a la lista de ramas
        const newBranch: Branch = {
          id: Math.random().toString(36).substr(2, 9),
          ...result,
          countryCode: result.countryCode || 'BR' // Default a Brasil si no viene
        };
        this.allBranches.push(newBranch);
      }
    });
  }

  onEditBranch(branch: Branch): void {
    this.dialog.open(BranchDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { isEdit: true, branch }
    }).afterClosed().subscribe((result: any) => {
      if (result) {
        // Actualizar la rama en la lista
        const index = this.allBranches.findIndex(b => b.id === branch.id);
        if (index > -1) {
          this.allBranches[index] = result;
        }
      }
    });
  }

  onDeleteBranch(branch: Branch): void {
    console.log('Eliminar filial:', branch);
  }

  getStatusClass(status: string): string {
    return status === 'Activo' ? 'status-active' : 'status-inactive';
  }

  getFlagUrl(countryCode: string): string {
    return `assets/flags/${countryCode}.svg`;
  }
}
