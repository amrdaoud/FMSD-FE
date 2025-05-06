import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        './dashboards/components/dashboard-layout/dashboard-layout.component'
      ).then((c) => c.DashboardLayoutComponent),
  },
  {
    path: 'reports/alarm-report',
    loadComponent: () =>
      import(
        './reports/reports/alarms-report/components/alarms-report.component'
      ).then((c) => c.AlarmsReportComponent),
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Group2'] },
  },
  {
    path: 'reports/tank-report',
    loadComponent: () =>
      import(
        './reports/reports/tank-measurement-report/components/tank-measurement-report.component'
      ).then((c) => c.TankMeasurementReportComponent),
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Group2'] },
  },
  {
    path: 'reports/transaction-report',
    loadComponent: () =>
      import(
        './reports/reports/distribution-report/components/distribution-report.component'
      ).then((c) => c.DistributionReportComponent),
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Group2'] },
  },
  {
    path: 'reports/transaction-detail-report',
    loadComponent: () =>
      import(
        './reports/reports/distribution-detail-report/components/distrinution-detail-report/distrinution-detail-report.component'
      ).then((c) => c.DistrinutionDetailReportComponent),
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Group2'] },
  },
  {
    path: 'reports/leakages-report',
    loadComponent: () =>
      import(
        './reports/reports/leakages-report/components/leakage/leakage.component'
      ).then((c) => c.LeakageComponent),
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Group2'] },
  },
  {
    path: 'reports/calibration-report',
    loadComponent: () =>
      import(
        './reports/reports/calibration-report/components/calibration-report/calibration-report.component'
      ).then((c) => c.CalibrationReportComponent),
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Group2'] },
  },
  {
    path: 'reports/calibration-detail-report',
    loadComponent: () =>
      import(
        './reports/reports/calibration-detail-report/components/calibration-detail-report/calibration-detail-report.component'
      ).then((c) => c.CalibrationDetailReportComponent),
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Group2'] },
  },
];
