import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardLayoutComponent } from '../../dashboard-card-layout/dashboard-card-layout.component';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardDateFilterModel } from '../../../models/dashboard';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-city-expected-fule',
  standalone: true,
  imports: [CommonModule,DashboardCardLayoutComponent,MatListModule,MatDividerModule,MatProgressBarModule],
  templateUrl: './city-expected-fule.component.html',
  styleUrl: './city-expected-fule.component.scss'
})
export class CityExpectedFuleComponent {
 private dashboardService = inject(DashboardService);
dateFilter = input.required<DashboardDateFilterModel>();
loading = this.dashboardService.daysOfAvailabilityLoading;

  report =
    toSignal(
      toObservable(this.dateFilter).pipe(
        switchMap(p => this.dashboardService.getDaysOfFuelAvailabilityCard(
          p))
      ));

}
