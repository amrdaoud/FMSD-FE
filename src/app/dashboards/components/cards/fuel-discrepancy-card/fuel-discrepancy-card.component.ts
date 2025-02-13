import { Component, computed, inject, Input, input, signal, Signal } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardDateFilterModel } from '../../../models/dashboard';
import { DashboardCardLayoutComponent } from '../../dashboard-card-layout/dashboard-card-layout.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-fuel-discrepancy-card',
  standalone: true,
  imports: [DashboardCardLayoutComponent,CommonModule,MatIconModule,MatButtonToggleModule],
  templateUrl: './fuel-discrepancy-card.component.html',
  styleUrl: './fuel-discrepancy-card.component.scss',
  providers: [DatePipe] // Add DatePipe to the providers array

})
export class FuelDiscrepancyCardComponent {

 private dashboardService = inject(DashboardService);
  loading = this.dashboardService.fuelVolumeDiscrepancyLoading;
  dateFilter = input.required<DashboardDateFilterModel>();
  options = ['Overall', 'Station'];
  selectedOption = signal<number>(0);

   reportOverAll =
    toSignal(
      toObservable(this.dateFilter).pipe(
        switchMap(p => this.dashboardService.getFuelVolumeDiscrepancyCard(
          p,true))
      ));

      reportStation =
    toSignal(
      toObservable(this.dateFilter).pipe(
        switchMap(p => this.dashboardService.getFuelVolumeDiscrepancyCard(
          p,false))
      ));


}
