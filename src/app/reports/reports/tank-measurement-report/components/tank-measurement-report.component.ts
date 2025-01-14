import { Component, inject, signal } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TankMeasurementConsts } from '../consts/tank-measurement-report.const';
import { Subscription, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TankMeasurementListViewModel } from '../models/tank-measurement-list-view-model';
import { MYDOWNLOAD } from '../../../../app-reusables/consts/download.const';
import { DataTableComponent } from "../../../../app-reusables/elements/data-table/components/data-table/data-table.component";

@Component({
  selector: 'app-tank-measurement-report',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './tank-measurement-report.component.html',
  styleUrl: './tank-measurement-report.component.scss',
  providers: [DecimalPipe, DatePipe]
})
export class TankMeasurementReportComponent {
  private reportService = inject(ReportService);
  loading = this.reportService.loading;
  loadingDownload = this.reportService.loadingDownload;
  columns = TankMeasurementConsts.columns;
  filters = TankMeasurementConsts.filters;
  initialFilters = signal(TankMeasurementConsts.initialFilters);
  downloadSubscription = new Subscription();
  private dataWithSize$ = toObservable(this.initialFilters).pipe(
    switchMap(f => this.reportService.getData<TankMeasurementListViewModel>('GetTanks',f))
  )
  dataWithSize = toSignal(this.dataWithSize$, {initialValue: {data: [], dataSize: 0}});
  downloadData() {
    const dd = Date.now();
    this.downloadSubscription = this.reportService.downloadData('ExportTankMeasurements', this.initialFilters()).subscribe(x => {
      MYDOWNLOAD.downloadFile(x,'Tank Measures');
    })
  }
  ngOnDestroy(): void {
    this.downloadSubscription.unsubscribe();
  }
}
