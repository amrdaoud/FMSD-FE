import { Component, computed, inject, input, signal } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardDateFilterModel } from '../../../models/dashboard';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DashboardCardLayoutComponent } from "../../dashboard-card-layout/dashboard-card-layout.component";
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from '../../../../app-reusables/elements/charts/components/chart/chart.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-daily-leackage-card',
  standalone: true,
  imports: [DashboardCardLayoutComponent, MatIconModule, ChartComponent, NgStyle],
  templateUrl: './daily-leackage-card.component.html',
  styleUrl: './daily-leackage-card.component.scss'
})
export class DailyLeackageCardComponent {
  private dashboardService = inject(DashboardService);
  loading = this.dashboardService.dailyFuelAvailabilityLoading;
  private drillDownGroups = ['city', 'station', 'tank'];

  drillParameter = signal<
  { index: number; label: string; }[]
>([{ index: 0, label: ''}]);


private lastDrillParameter = computed(() => {
  return this.drillParameter()[this.drillParameter().length - 1];
});

  dateFilter = input.required<DashboardDateFilterModel>();

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

  reportChart = 
  toSignal(
    toObservable(this.dateFilter).pipe(
      switchMap(p => this.dashboardService.getDailyLeackage('',
        p))
    )
    ,
  { initialValue: { datasets: [], labels: [], values: [] }});
}
