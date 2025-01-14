import { Component, inject, OnDestroy, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Subscription, switchMap } from 'rxjs';
import { DataTableComponent } from '../../../../app-reusables/elements/data-table/components/data-table/data-table.component';
import { ReportService } from '../../../services/report.service';
import { AlarmReportConsts } from '../consts/alarm-report.const';
import { AlarmListViewModel } from '../models/alarm-list-view-model';
import { DatePipe } from '@angular/common';
import { MYDOWNLOAD } from '../../../../app-reusables/consts/download.const';

@Component({
  selector: 'app-alarms-report',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './alarms-report.component.html',
  styleUrl: './alarms-report.component.scss',
  providers: [DatePipe]
})
export class AlarmsReportComponent implements OnDestroy {
  private reportService = inject(ReportService);
  loading = this.reportService.loading;
  loadingDownload = this.reportService.loadingDownload;
  columns = AlarmReportConsts.columns;
  filters = AlarmReportConsts.filters;
  initialFilters = signal(AlarmReportConsts.initialFilters);
  downloadSubscription = new Subscription();
  private dataWithSize$ = toObservable(this.initialFilters).pipe(
    switchMap(f => this.reportService.getData<AlarmListViewModel>('GetAlarms',f))
  )
  dataWithSize = toSignal(this.dataWithSize$, {initialValue: {data: [], dataSize: 0}});
  downloadData() {
    const dd = Date.now();
    this.downloadSubscription = this.reportService.downloadData('exportAlarms', this.initialFilters()).subscribe(x => {
      MYDOWNLOAD.downloadFile(x, 'Alarms');
    })
  }
  ngOnDestroy(): void {
    this.downloadSubscription.unsubscribe();
  }

}
