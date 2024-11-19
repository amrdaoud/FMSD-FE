import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DashboardCardLayoutComponent } from '../../dashboard-card-layout/dashboard-card-layout.component';
import { DashboardService } from '../../../services/dashboard.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartComponent } from '../../../../app-reusables/elements/charts/components/chart/chart.component';

@Component({
  selector: 'app-fuel-availability-chart-report',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    DashboardCardLayoutComponent,
    ChartComponent,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './fuel-availability-chart-report.component.html',
  styleUrl: './fuel-availability-chart-report.component.scss',
})
export class FuelAvailabilityChartReportComponent {
  private dashboardService = inject(DashboardService);
  options = ['Current', 'TCV'];
  selectedOption = signal<number>(0);
  loadingChart = this.dashboardService.fuelAvailabilityLoading;
  private drillDownGroups = ['city', 'station', 'tank'];
  drillParameter = signal<
    { index: number; label: string; }[]
  >([{ index: 0, label: ''}]);
  private lastDrillParameter = computed(() => {
    return this.drillParameter()[this.drillParameter().length - 1];
  });
  chartReport = toSignal(
    toObservable(this.lastDrillParameter).pipe(
      switchMap((p) => {
        return this.dashboardService.getFuelAvailabilityChart(
          this.drillDownGroups[p.index],
          false,
          p.label
        );
      })
    ),
    { initialValue: { datasets: [], labels: [], values: [] } }
  );

  chartReportTcv = toSignal(
    toObservable(this.lastDrillParameter).pipe(
      switchMap((p) => {
        return this.dashboardService.getFuelAvailabilityChart(
          this.drillDownGroups[p.index],
          true,
          p.label
        );
      })
    ),
    { initialValue: { datasets: [], labels: [], values: [] } }
  );
  pushParameter(drillDownObject?: { serie?: string; label?: string }) {
    if(this.drillParameter().length >= 3) {
      return;
    }
    this.drillParameter.set([
      ...this.drillParameter(),
      {
        index: this.drillParameter().length,
        label: drillDownObject?.label!
      },
    ]);
  }
  rollUp() {
    this.drillParameter.set(this.drillParameter().slice(0, this.drillParameter().length - 1));
  }
}
