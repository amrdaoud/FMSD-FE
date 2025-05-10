import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeviceService } from '../../../app-reusables/services/device.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FuelAvailabilityChartReportComponent } from '../cards/fuel-availability-chart-report/fuel-availability-chart-report.component';
import { DailyFuelAvailabilityCardComponent } from '../cards/daily-fuel-availability-card/daily-fuel-availability-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { DashboardDateFilterModel } from '../../models/dashboard';
import { AlarmTypesCardComponent } from '../cards/alarm-types-card/alarm-types-card.component';
import { DailyLeackageCardComponent } from '../cards/daily-leackage-card/daily-leackage-card.component';
import { SuppliersPerformanceCardComponent } from '../cards/suppliers-performance-card/suppliers-performance-card.component';
import { FuelDiscrepancyCardComponent } from '../cards/fuel-discrepancy-card/fuel-discrepancy-card.component';
import { CityExpectedFuleComponent } from '../cards/city-expected-fule/city-expected-fule.component';
import { UnacceptedVolumeCardComponent } from '../cards/unaccepted-volume-card/unaccepted-volume-card.component';
import { SmallStationCardsComponent } from '../cards/small-station-cards/small-station-cards.component';
import { AccountService } from '../../services/account.service';
import { MetaCard, MetaComponent } from '../../models/MetaCard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatGridListModule,
    MatButtonToggleModule,
    FuelAvailabilityChartReportComponent,
    DailyFuelAvailabilityCardComponent,
    AlarmTypesCardComponent,
    DailyLeackageCardComponent,
    SuppliersPerformanceCardComponent,
    FuelDiscrepancyCardComponent,
    CityExpectedFuleComponent,
    UnacceptedVolumeCardComponent,
    SmallStationCardsComponent,
    CommonModule,
  ],

  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit {
  ngOnInit(): void {}

  private dateDialog = inject(MatDialog);
  cols = inject(DeviceService).dashboardCols;
  private currentDate = new Date();
  protected accountService = inject(AccountService);
  protected dashboardService = inject(DashboardService);
  loading = this.dashboardService.dashboardViewCfgLoading;

  private dashboardLayoutView = new BehaviorSubject<MetaComponent[] | null>(
    null
  );

  dateForm = new FormGroup(
    {
      startDate: new FormControl(
        new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
        Validators.required
      ),
      endDate: new FormControl(this.currentDate, Validators.required),
      threshold: new FormControl(50, [Validators.min(0), Validators.max(100)]),
      startTime: new FormControl('00:00'),
      endTime: new FormControl('23:59'),
      stationGUID: new FormControl(''),
    },
    { updateOn: 'submit' }
  );
  openDateDialog() {
    this.dateDialog.open(DateDialogComponent, { data: this.dateForm });
  }
  dateFilter = toSignal(
    this.dateForm.valueChanges.pipe(
      filter((x) => this.dateForm.valid)
    ) as Observable<DashboardDateFilterModel>,
    {
      initialValue: {
        startDate: new Date(
          this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        ),
        endDate: this.currentDate,
        threshold: 50,
        startTime: '00:00',
        endTime: '23:59',
        stationGUID: '',
      },
    }
  );

  getComponentStyle(componentName: string): Observable<MetaComponent | null> {
    return this.dashboardLayoutView.pipe(
      switchMap((metaCard) => {
        if (metaCard) {
          // Already loaded, search directly
          return of(
            metaCard?.find((x) => x.componentName === componentName) || null
          );
        } else {
          // Not loaded yet, fetch from API
          return this.dashboardService.getDashboardLayoutView().pipe(
            tap((response) => this.dashboardLayoutView.next(response)),
            map(
              (response) =>
                response?.find((x) => x.componentName === componentName) || null
            ),
            catchError((error) => {
              console.error('Failed to fetch dashboard layout:', error);
              this.dashboardLayoutView.next(null);
              return of(null);
            })
          );
        }
      }),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }
}
