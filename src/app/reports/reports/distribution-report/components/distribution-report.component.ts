import { Component, inject, signal } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { FuelTransactionConsts } from '../consts/distribution-report.const';
import { Subscription, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MYDOWNLOAD } from '../../../../app-reusables/consts/download.const';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DataTableComponent } from "../../../../app-reusables/elements/data-table/components/data-table/data-table.component";
import { FuelTransactionListViewModel } from '../models/fuel-transaction-list-view-model';

@Component({
  selector: 'app-distribution-report',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './distribution-report.component.html',
  styleUrl: './distribution-report.component.scss',
  providers: [
    DatePipe,
    DecimalPipe
  ]
})
export class DistributionReportComponent {
  private reportService = inject(ReportService);
  loading = this.reportService.loading;
  loadingDownload = this.reportService.loadingDownload;
  columns = FuelTransactionConsts.columns;
  filters = FuelTransactionConsts.filters;
  initialFilters = signal(FuelTransactionConsts.initialFilters);
  downloadSubscription = new Subscription();
  private dataWithSize$ = toObservable(this.initialFilters).pipe(
    switchMap(f => this.reportService.getData<FuelTransactionListViewModel>('GetFuelTransactions',f))
  )
  dataWithSize = toSignal(this.dataWithSize$, {initialValue: {data: [], dataSize: 0}});
  downloadData() {
    const dd = Date.now();
    this.downloadSubscription = this.reportService.downloadData('ExportFuelTransactions', this.initialFilters()).subscribe(x => {
      MYDOWNLOAD.downloadFile(x,'Fuel Transactions');
    })
  }
  ngOnDestroy(): void {
    this.downloadSubscription.unsubscribe();
  }
}
