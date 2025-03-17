import { Component, inject, signal } from '@angular/core';
import { ReportService } from '../../../../services/report.service'
import { Subscription, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MYDOWNLOAD } from '../../../../../app-reusables/consts/download.const';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DataTableComponent } from "../../../../../app-reusables/elements/data-table/components/data-table/data-table.component";
import { CalibrationDetailReportConsts } from '../../consts/calibration-detail-report.const';
import { CalibrationDetailListViewModel } from '../../models/calibration-detail-list-view-model';


@Component({
  selector: 'app-calibration-detail-report',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './calibration-detail-report.component.html',
  styleUrl: './calibration-detail-report.component.scss',
  providers: [
    DatePipe,
    DecimalPipe
  ]
})
export class CalibrationDetailReportComponent {

private reportService = inject(ReportService);

    loading = this.reportService.loading;
    loadingDownload = this.reportService.loadingDownload;
    columns = CalibrationDetailReportConsts.columns;
    filters = CalibrationDetailReportConsts.filters;
    initialFilters = signal(CalibrationDetailReportConsts.initialFilters);
    downloadSubscription = new Subscription();
    private dataWithSize$ = toObservable(this.initialFilters).pipe(
      switchMap(f => this.reportService.getData<CalibrationDetailListViewModel>('GetCalibrationDetails',f))
    )
    dataWithSize = toSignal(this.dataWithSize$, {initialValue: {data: [], dataSize: 0}});
    downloadData() {
      const dd = Date.now();
      this.downloadSubscription = this.reportService.downloadData('ExportCalibrationDetails', this.initialFilters()).subscribe(x => {
        MYDOWNLOAD.downloadFile(x,'CalibrationsDetails');
      })
    }
    ngOnDestroy(): void {
      this.downloadSubscription.unsubscribe();
    }
}
