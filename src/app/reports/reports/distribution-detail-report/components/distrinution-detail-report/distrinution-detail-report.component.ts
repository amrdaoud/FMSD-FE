import { Component, inject, signal } from '@angular/core';
import { ReportService } from '../../../../services/report.service'
import { Subscription, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MYDOWNLOAD } from '../../../../../app-reusables/consts/download.const';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DataTableComponent } from "../../../../../app-reusables/elements/data-table/components/data-table/data-table.component";
import { DistributionDetailsListViewModel } from '../../models/distribution-details-list-view-model';
import { DistributionDetailReportConst } from '../../consts/distribution-detail-report.const';


@Component({
  selector: 'app-distrinution-detail-report',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './distrinution-detail-report.component.html',
  styleUrl: './distrinution-detail-report.component.scss',
  providers: [
    DatePipe,
    DecimalPipe
  ]
})

export class DistrinutionDetailReportComponent {

  private reportService = inject(ReportService);
    loading = this.reportService.loading;
    loadingDownload = this.reportService.loadingDownload;
    columns = DistributionDetailReportConst.columns;
    filters = DistributionDetailReportConst.filters;
    initialFilters = signal(DistributionDetailReportConst.initialFilters);
    downloadSubscription = new Subscription();
    private dataWithSize$ = toObservable(this.initialFilters).pipe(
      switchMap(f => this.reportService.getData<DistributionDetailsListViewModel>('GetTransactionDetails',f))
    )
    dataWithSize = toSignal(this.dataWithSize$, {initialValue: {data: [], dataSize: 0}});
    downloadData() {
      const dd = Date.now();
      this.downloadSubscription = this.reportService.downloadData('ExportTransactionDetails', this.initialFilters()).subscribe(x => {
        MYDOWNLOAD.downloadFile(x,'Fuel Transactions Details');
      })
    }
    ngOnDestroy(): void {
      this.downloadSubscription.unsubscribe();
    }
}
