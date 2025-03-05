import { Component, inject, input, signal } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DashboardCardLayoutComponent } from "../../dashboard-card-layout/dashboard-card-layout.component";
import { DashboardDateFilterModel } from '../../../models/dashboard';
import { switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from '../../../../app-reusables/elements/charts/components/chart/chart.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-suppliers-performance-card',
  standalone: true,
  imports: [DashboardCardLayoutComponent, ChartComponent, MatIconModule,MatButtonToggleModule],
  templateUrl: './suppliers-performance-card.component.html',
  styleUrl: './suppliers-performance-card.component.scss'
})
export class SuppliersPerformanceCardComponent {

  private dashboardService = inject(DashboardService);
  loading = this.dashboardService.supplierPerformanceLoading;
  dateFilter = input.required<DashboardDateFilterModel>();
  //options = ['Distr..','Filling'];
  //selectedOption = signal<number>(0);

  reportFillingChart =
  toSignal(
    toObservable(this.dateFilter).pipe(
      switchMap(p => this.dashboardService.getSupplierPerformanceCard(
        p,true))
    )
    ,
  { initialValue: { datasets: [], labels: [], values: [] }});



  // reportDistributionChart =
  // toSignal(
  //   toObservable(this.dateFilter).pipe(
  //     switchMap(p => this.dashboardService.getSupplierPerformanceCard(
  //       p,false))
  //   )
  //   ,
  // { initialValue: { datasets: [], labels: [], values: [] }});




}
