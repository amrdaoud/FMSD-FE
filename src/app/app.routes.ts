import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', loadComponent: () => import('./dashboards/components/dashboard-layout/dashboard-layout.component').then(c => c.DashboardLayoutComponent)}
];
