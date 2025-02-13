import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ChartApiResponse, CityExpectedToProvideFuelResult, DashboardDateFilterModel, UnjustifiedDiscrepanciesInFuelVolumeResult } from '../models/dashboard';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}Dashboards`;

  private fuelAvailabilityLoading$ = signal(false);
  get fuelAvailabilityLoading(): Signal<boolean> {
    return computed(() => this.fuelAvailabilityLoading$())
  }

  private dailyFuelAvailabilityLoading$ = signal(false);
  get dailyFuelAvailabilityLoading(): Signal<boolean> {
    return computed(() => this.dailyFuelAvailabilityLoading$())
  }

  private alarmTypesLoading$ = signal(false);
  get alarmTypesLoading(): Signal<boolean> {
    return computed(() => this.alarmTypesLoading$())
  }

  private dailyLeackageLoading$ = signal(false);
  get dailyLeackageLoading(): Signal<boolean> {
    return computed(() => this.dailyLeackageLoading$())
  }


  private supplierPerformanceLoading$ = signal(false);
  get supplierPerformanceLoading(): Signal<boolean> {
    return computed(() => this.supplierPerformanceLoading$())
  }

  private fuelVolumeDiscrepancyLoading$ = signal(false);
  get fuelVolumeDiscrepancyLoading(): Signal<boolean> {
    return computed(() => this.fuelVolumeDiscrepancyLoading$())
  }

  private daysOfAvailabilityLoading$ = signal(false);
  get daysOfAvailabilityLoading(): Signal<boolean> {
    return computed(() => this.daysOfAvailabilityLoading$())
  }


  getFuelAvailabilityChart(groupBy: string,dateFilter: DashboardDateFilterModel, tcv: boolean, name?: string): Observable<ChartApiResponse> {
    this.fuelAvailabilityLoading$.set(true);
    var params = new HttpParams();
    params = params.append('tcv', tcv);
    params = params.append('startDate',this.convertToISO(dateFilter.startDate, dateFilter.startTime));
    params = params.append('endDate', this.convertToISO(dateFilter.endDate, dateFilter.endTime));
    params = params.append('threshould', dateFilter.threshould);

    if(name) params = params.append('name', name);
    var result: Observable<ChartApiResponse>;
    if(groupBy === 'station') {
      result = this.http.get<ChartApiResponse>(this.apiUrl + '/stationreport', {params});
    } else if (groupBy === 'tank') {
      result = this.http.get<ChartApiResponse>(this.apiUrl + '/tankreport', {params});
    }
    else {
      result = this.http.get<ChartApiResponse>(this.apiUrl + '/cityreport', {params});
    }
    return result.pipe(
      finalize(() => this.fuelAvailabilityLoading$.set(false))
    )
  }
  getDailyAvailabilityCard(dateFilter: DashboardDateFilterModel): Observable<ChartApiResponse> {
    this.dailyFuelAvailabilityLoading$.set(true);
    var params = new HttpParams();
    params = params.append('startDate',this.convertToISO(dateFilter.startDate, dateFilter.startTime));
    params = params.append('endDate', this.convertToISO(dateFilter.endDate, dateFilter.endTime));
    params = params.append('threshould', dateFilter.threshould);

    return this.http.get<ChartApiResponse>(this.apiUrl + '/TanksDailyFuelVolume', {params}).pipe(
      finalize(() => this.dailyFuelAvailabilityLoading$.set(false))
    )
  }
  getAlarmTypesCard(dateFilter: DashboardDateFilterModel): Observable<ChartApiResponse> {
    this.alarmTypesLoading$.set(true);
    var params = new HttpParams();
    params = params.append('startDate',this.convertToISO(dateFilter.startDate, dateFilter.startTime));
    params = params.append('endDate', this.convertToISO(dateFilter.endDate, dateFilter.endTime));
    params = params.append('threshould', dateFilter.threshould);

    return this.http.get<ChartApiResponse>(this.apiUrl + '/alarmTypesChart', {params}).pipe(
      finalize(() => this.alarmTypesLoading$.set(false))
    )
  }

  getDailyLeackage(dateFilter: DashboardDateFilterModel , city : boolean): Observable<ChartApiResponse> {
    this.dailyLeackageLoading$.set(true);
    var params = new HttpParams();
    params = params.append('startDate',this.convertToISO(dateFilter.startDate, dateFilter.startTime));
    params = params.append('endDate', this.convertToISO(dateFilter.endDate, dateFilter.endTime));
    params = params.append('threshould', dateFilter.threshould);
    params = params.append('city',city);

    return this.http.get<ChartApiResponse>(this.apiUrl + '/DailyLeackageChart', {params}).pipe(
      finalize(() => this.dailyLeackageLoading$.set(false))
    )
  }

  getSupplierPerformanceCard(dateFilter: DashboardDateFilterModel , filling : boolean): Observable<ChartApiResponse> {
    this.supplierPerformanceLoading$.set(true);
    var params = new HttpParams();
    params = params.append('startDate',this.convertToISO(dateFilter.startDate, dateFilter.startTime));
    params = params.append('endDate', this.convertToISO(dateFilter.endDate, dateFilter.endTime));
    params = params.append('threshould', dateFilter.threshould);
    params = params.append('filling', filling);

    return this.http.get<ChartApiResponse>(this.apiUrl + '/SuppliersPerformance', {params}).pipe(
      finalize(() => this.supplierPerformanceLoading$.set(false))
    )
  }

  getFuelVolumeDiscrepancyCard(dateFilter: DashboardDateFilterModel , overall : boolean): Observable<UnjustifiedDiscrepanciesInFuelVolumeResult[]> {
    this.fuelVolumeDiscrepancyLoading$.set(true);
    var params = new HttpParams();
    params = params.append('startDate',this.convertToISO(dateFilter.startDate, dateFilter.startTime));
    params = params.append('endDate', this.convertToISO(dateFilter.endDate, dateFilter.endTime));
    params = params.append('threshould', dateFilter.threshould);
    params = params.append('overall',overall);

    return this.http.get<UnjustifiedDiscrepanciesInFuelVolumeResult[]>(this.apiUrl + '/UnjustifiedDiscrepanciesInFuelVolume', {params}).pipe(
      finalize(() => this.fuelVolumeDiscrepancyLoading$.set(false))
    )
  }


  getDaysOfFuelAvailabilityCard(dateFilter: DashboardDateFilterModel): Observable<CityExpectedToProvideFuelResult[]> {
    this.daysOfAvailabilityLoading$.set(true);
    var params = new HttpParams();
    params = params.append('startDate',this.convertToISO(dateFilter.startDate, dateFilter.startTime));
    params = params.append('endDate', this.convertToISO(dateFilter.endDate, dateFilter.endTime));
    params = params.append('threshould', dateFilter.threshould);

    return this.http.get<CityExpectedToProvideFuelResult[]>(this.apiUrl + '/CityExpectedToProvideFuel', {params}).pipe(
      finalize(() => this.daysOfAvailabilityLoading$.set(false))
    )
  }

   convert12ToISO(date: Date, time: string): string {
    // Convert 12-hour time (AM/PM) to 24-hour format
    const timeParts = time.match(/^(\d+):(\d+)\s?(AM|PM)$/i);

    if (!timeParts) {
      throw new Error("Invalid time format. Expected format: HH:mm AM/PM");
    }

    let [_, hours, minutes, period] = timeParts;
    let hourNum = parseInt(hours, 10);

    if (period.toUpperCase() === "PM" && hourNum !== 12) {
      hourNum += 12;
    } else if (period.toUpperCase() === "AM" && hourNum === 12) {
      hourNum = 0;
    }

    const formattedTime = `${hourNum.toString().padStart(2, "0")}:${minutes}:00`;

    return new Date(`${date.toISOString().split("T")[0]}T${formattedTime}Z`).toISOString();
  }
  convertToISO(date: Date, time: string): string {
    // Validate time format (HH:mm)
    const timeParts = time.match(/^(\d{1,2}):(\d{2})$/);

    if (!timeParts) {
      throw new Error("Invalid time format. Expected format: HH:mm (24-hour)");
    }

    const [_, hours, minutes] = timeParts;
    const formattedTime = `${hours.padStart(2, "0")}:${minutes}:00`;

    // Construct the full ISO DateTime string
    return new Date(`${date.toISOString().split("T")[0]}T${formattedTime}Z`).toISOString();
  }

}
