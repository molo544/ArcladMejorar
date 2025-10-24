import { Routes } from '@angular/router';
import { BranchesListPageComponent } from './pages/branches-list-page/branches-list-page';

export const BRANCHES_ROUTES: Routes = [
  {
    path: '',
    component: BranchesListPageComponent,
    data: { title: 'BRANCHES.TITLE' }
  }
];
