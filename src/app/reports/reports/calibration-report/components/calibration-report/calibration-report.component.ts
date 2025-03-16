import { Component, inject, signal } from '@angular/core';
import { ReportService } from '../../../../services/report.service'
import { Subscription, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MYDOWNLOAD } from '../../../../../app-reusables/consts/download.const';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DataTableComponent } from "../../../../../app-reusables/elements/data-table/components/data-table/data-table.component";
import { CalibrationConsts } from '../../consts/calibration-report.const';
import { CalibrationListViewModel } from '../../models/calibration-list-view-model';

@Component({
  selector: 'app-calibration-report',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './calibration-report.component.html',
  styleUrl: './calibration-report.component.scss',
  providers: [
    DatePipe,
    DecimalPipe
  ]
})
export class CalibrationReportComponent {

private reportService = inject(ReportService);

    loading = this.reportService.loading;
    loadingDownload = this.reportService.loadingDownload;
    columns = CalibrationConsts.columns;
    filters = CalibrationConsts.filters;
    initialFilters = signal(CalibrationConsts.initialFilters);
    downloadSubscription = new Subscription();
    private dataWithSize$ = toObservable(this.initialFilters).pipe(
      switchMap(f => this.reportService.getData<CalibrationListViewModel>('GetCalibrations',f))
    )
    dataWithSize = toSignal(this.dataWithSize$, {initialValue: {data: [], dataSize: 0}});
    downloadData() {
      const dd = Date.now();
      this.downloadSubscription = this.reportService.downloadData('ExportCalibrations', this.initialFilters()).subscribe(x => {
        MYDOWNLOAD.downloadFile(x,'Calibrations');
      })
    }
    ngOnDestroy(): void {
      this.downloadSubscription.unsubscribe();
    }
}
