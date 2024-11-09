import { Component, inject, input } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DashboardCardLayoutComponent } from "../../dashboard-card-layout/dashboard-card-layout.component";
import { ChartComponent } from "../../../../charts/components/chart/chart.component";
import { dashboardDateFilterModel } from '../../../models/dashboard';
import { switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-daily-fuel-availability-card',
  standalone: true,
  imports: [DashboardCardLayoutComponent, ChartComponent, MatIconModule],
  templateUrl: './daily-fuel-availability-card.component.html',
  styleUrl: './daily-fuel-availability-card.component.scss'
})
export class DailyFuelAvailabilityCardComponent {
  private dashboardService = inject(DashboardService);
  loading = this.dashboardService.dailyFuelAvailabilityLoading;
  dateFilter = input.required<dashboardDateFilterModel>();
  reportChart = 
  toSignal(
    toObservable(this.dateFilter).pipe(
      switchMap(p => this.dashboardService.getDailyAvailabilityCard(
        p))
    )
    ,
  { initialValue: { datasets: [], labels: [], values: [] }});
}
