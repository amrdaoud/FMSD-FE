import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeviceService } from '../../../app-services/device.service';
import { DashboardCardLayoutComponent } from "../dashboard-card-layout/dashboard-card-layout.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FuelAvailabilityChartReportComponent } from "../cards/fuel-availability-chart-report/fuel-availability-chart-report.component";
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatGridListModule, DashboardCardLayoutComponent, MatButtonToggleModule, FuelAvailabilityChartReportComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  private dateDialog = inject(MatDialog);
  cols = inject(DeviceService).dashboardCols;




  private currentDate = new Date();
  dateForm = new FormGroup({
    startDate: new FormControl(new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000), Validators.required),
    endDate: new FormControl(this.currentDate, Validators.required),
  },{updateOn: 'submit'});
  openDateDialog() {
    this.dateDialog.open(DateDialogComponent, {data: this.dateForm})
  }
}
