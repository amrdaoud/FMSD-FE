import { Component, inject, signal } from '@angular/core';
import { ReportService } from '../../../../services/report.service'
import { Subscription, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MYDOWNLOAD } from '../../../../../app-reusables/consts/download.const';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DataTableComponent } from "../../../../../app-reusables/elements/data-table/components/data-table/data-table.component";
import { LeakageReportConst } from '../../consts/leakage-report.const';
import { LeakageListViewModel } from '../../models/leakage-list-view-model';

@Component({
  selector: 'app-leakage',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './leakage.component.html',
  styleUrl: './leakage.component.scss',
  providers: [
    DatePipe,
    DecimalPipe
  ]
})
export class LeakageComponent {

  private reportService = inject(ReportService);
      loading = this.reportService.loading;
      loadingDownload = this.reportService.loadingDownload;
      columns = LeakageReportConst.columns;
      filters = LeakageReportConst.filters;
      initialFilters = signal(LeakageReportConst.initialFilters);
      downloadSubscription = new Subscription();
      private dataWithSize$ = toObservable(this.initialFilters).pipe(
        switchMap(f => this.reportService.getData<LeakageListViewModel>('GetLeakages',f))
      )
      dataWithSize = toSignal(this.dataWithSize$, {initialValue: {data: [], dataSize: 0}});
      downloadData() {
        const dd = Date.now();
        this.downloadSubscription = this.reportService.downloadData('ExportLeakages', this.initialFilters()).subscribe(x => {
          MYDOWNLOAD.downloadFile(x,'Leakages Report');
        })
      }
      ngOnDestroy(): void {
        this.downloadSubscription.unsubscribe();
      }
  
}
