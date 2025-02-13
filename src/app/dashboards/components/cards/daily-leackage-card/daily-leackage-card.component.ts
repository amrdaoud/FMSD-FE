import { Component, computed, inject, input, signal } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardDateFilterModel } from '../../../models/dashboard';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, switchMap } from 'rxjs';
import { DashboardCardLayoutComponent } from "../../dashboard-card-layout/dashboard-card-layout.component";
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from '../../../../app-reusables/elements/charts/components/chart/chart.component';
import { NgStyle } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-daily-leackage-card',
  standalone: true,
  imports: [DashboardCardLayoutComponent, MatIconModule, ChartComponent, NgStyle,MatButtonToggleModule],
  templateUrl: './daily-leackage-card.component.html',
  styleUrl: './daily-leackage-card.component.scss'
})
export class DailyLeackageCardComponent {
  private dashboardService = inject(DashboardService);
  loading = this.dashboardService.dailyLeackageLoading;
  options = ['City', 'Station'];
  selectedOption = signal<number>(0);
  dateFilter = input.required<DashboardDateFilterModel>();


  chartCityReport = toSignal(
    toObservable(this.dateFilter).pipe(
      switchMap(p => this.dashboardService.getDailyLeackage(
        p,true))
    )
    ,
  { initialValue: { datasets: [], labels: [], values: [] }});


  chartStationReport =
  toSignal(
    toObservable(this.dateFilter).pipe(
      switchMap(p => this.dashboardService.getDailyLeackage(
        p,false))
    )
    ,
  { initialValue: { datasets: [], labels: [], values: [] }});

}
