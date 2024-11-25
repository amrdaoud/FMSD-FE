import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeviceService } from '../../../app-reusables/services/device.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FuelAvailabilityChartReportComponent } from "../cards/fuel-availability-chart-report/fuel-availability-chart-report.component";
import { DailyFuelAvailabilityCardComponent } from "../cards/daily-fuel-availability-card/daily-fuel-availability-card.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, Observable } from 'rxjs';
import { DashboardDateFilterModel } from '../../models/dashboard';
import { AlarmTypesCardComponent } from "../cards/alarm-types-card/alarm-types-card.component";
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatGridListModule, MatButtonToggleModule, FuelAvailabilityChartReportComponent, DailyFuelAvailabilityCardComponent, AlarmTypesCardComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  private dateDialog = inject(MatDialog);
  cols = inject(DeviceService).dashboardCols;



  private currentDate = new Date(2024, 9, 7);
  dateForm = new FormGroup({
    startDate: new FormControl(new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000), Validators.required),
    endDate: new FormControl(this.currentDate, Validators.required),
  },{updateOn: 'submit'});
  openDateDialog() {
    this.dateDialog.open(DateDialogComponent, {data: this.dateForm})
  }
  dateFilter = toSignal(
    this.dateForm.valueChanges
    .pipe(
      filter(x => this.dateForm.valid)
    ) as Observable<DashboardDateFilterModel>,
    {initialValue: {
      startDate: new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
      endDate: this.currentDate
    }}
  )
}
