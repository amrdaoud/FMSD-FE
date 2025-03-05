import { Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DashboardCardLayoutComponent } from '../../dashboard-card-layout/dashboard-card-layout.component';
import { DashboardService } from '../../../services/dashboard.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, switchMap } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartComponent } from '../../../../app-reusables/elements/charts/components/chart/chart.component';
import { DashboardDateFilterModel } from '../../../models/dashboard';
@Component({
  selector: 'app-small-station-cards',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    DashboardCardLayoutComponent,
    ChartComponent,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './small-station-cards.component.html',
  styleUrl: './small-station-cards.component.scss'
})
export class SmallStationCardsComponent {
  private dashboardService = inject(DashboardService);
  options = ['Current', 'TCV'];
  selectedOption = signal<number>(0);
  loadingChart = this.dashboardService.fuelAvailabilityLoading;
  private drillDownGroups = ['city', 'station', 'tank'];
  dateFilter = input.required<DashboardDateFilterModel>();

  drillParameter = signal<
    { index: number; label: string; }[]
  >([{ index: 0, label: ''}]);

  private lastDrillParameter = computed(() => {
    return this.drillParameter()[this.drillParameter().length - 1];
  });

  chartReport = toSignal(
    combineLatest([toObservable(this.dateFilter), toObservable(this.lastDrillParameter)]).pipe(
      switchMap(([dateFilterValue, lastDrillParamValue]) => {
        return this.dashboardService.getFuelAvailabilityChart(
          this.drillDownGroups[lastDrillParamValue.index],
          dateFilterValue,
          false,
          lastDrillParamValue.label
        );
      })
    ),
    { initialValue: { datasets: [], labels: [], values: [] } }
  );

  chartReportTcv =toSignal(
    combineLatest([toObservable(this.dateFilter), toObservable(this.lastDrillParameter)]).pipe(
      switchMap(([dateFilterValue, lastDrillParamValue]) => {
        return this.dashboardService.getFuelAvailabilityChart(
          this.drillDownGroups[lastDrillParamValue.index],
          dateFilterValue,
          true,
          lastDrillParamValue.label
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
