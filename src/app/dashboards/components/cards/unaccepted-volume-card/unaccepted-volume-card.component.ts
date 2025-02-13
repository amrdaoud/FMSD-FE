import { Component, inject, input, signal } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DashboardCardLayoutComponent } from "../../dashboard-card-layout/dashboard-card-layout.component";
import { DashboardDateFilterModel } from '../../../models/dashboard';
import { switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from '../../../../app-reusables/elements/charts/components/chart/chart.component';

@Component({
  selector: 'app-unaccepted-volume-card',
  standalone: true,
  imports: [DashboardCardLayoutComponent, ChartComponent, MatIconModule],
  templateUrl: './unaccepted-volume-card.component.html',
  styleUrl: './unaccepted-volume-card.component.scss'
})
export class UnacceptedVolumeCardComponent {

  private dashboardService = inject(DashboardService);
  loading = this.dashboardService.unacceptedVolumeLoading;
  dateFilter = input.required<DashboardDateFilterModel>();

  reportChart =
  toSignal(
    toObservable(this.dateFilter).pipe(
      switchMap(p => this.dashboardService.getUnacceptedVolumeCard(
        p))
    )
    ,
  { initialValue: { datasets: [], labels: [], values: [] }});
}
