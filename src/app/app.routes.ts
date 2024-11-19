import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', loadComponent: () => import('./dashboards/components/dashboard-layout/dashboard-layout.component').then(c => c.DashboardLayoutComponent)},
    {path: 'reports/alarm-report', loadComponent: () => import('./reports/reports/alarms-report/components/alarms-report.component').then(c => c.AlarmsReportComponent)},
    {path: 'reports/tank-report', loadComponent: () => import('./reports/reports/tank-measurement-report/components/tank-measurement-report/tank-measurement-report.component').then(c => c.TankMeasurementReportComponent)},
];
