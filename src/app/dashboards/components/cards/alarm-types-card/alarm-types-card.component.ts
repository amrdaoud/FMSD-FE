import { Component, inject, input } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardDateFilterModel } from '../../../models/dashboard';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DashboardCardLayoutComponent } from "../../dashboard-card-layout/dashboard-card-layout.component";
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { ChartComponent } from "../../../../app-reusables/elements/charts/components/chart/chart.component";

@Component({
  selector: 'app-alarm-types-card',
  standalone: true,
  imports: [DashboardCardLayoutComponent, MatIconModule, NgStyle, ChartComponent],
  templateUrl: './alarm-types-card.component.html',
  styleUrl: './alarm-types-card.component.scss',
  providers: [DashboardService]
})
export class AlarmTypesCardComponent {
  private dashboardService = inject(DashboardService);
  loading = this.dashboardService.dailyFuelAvailabilityLoading;
  dateFilter = input.required<DashboardDateFilterModel>();
  reportChart = 
  toSignal(
    toObservable(this.dateFilter).pipe(
      switchMap(p => this.dashboardService.getAlarmTypesCard(
        p))
    )
    ,
  { initialValue: { datasets: [], labels: [], values: [] }});
}
