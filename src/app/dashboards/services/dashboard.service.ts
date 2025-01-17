import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ChartApiResponse, DashboardDateFilterModel } from '../models/dashboard';
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

  getFuelAvailabilityChart(groupBy: string, tcv: boolean, name?: string): Observable<ChartApiResponse> {
    this.fuelAvailabilityLoading$.set(true);
    var params = new HttpParams();
    params = params.append('tcv', tcv);
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
    params = params.append('startDate', dateFilter.startDate.toISOString());
    params = params.append('endDate', dateFilter.endDate.toISOString());
    return this.http.get<ChartApiResponse>(this.apiUrl + '/TanksDailyFuelVolume', {params}).pipe(
      finalize(() => this.dailyFuelAvailabilityLoading$.set(false))
    )
  }
  getAlarmTypesCard(dateFilter: DashboardDateFilterModel): Observable<ChartApiResponse> {
    this.alarmTypesLoading$.set(true);
    var params = new HttpParams();
    params = params.append('startDate', dateFilter.startDate.toISOString());
    params = params.append('endDate', dateFilter.endDate.toISOString());
    return this.http.get<ChartApiResponse>(this.apiUrl + '/alarmTypesChart', {params}).pipe(
      finalize(() => this.alarmTypesLoading$.set(false))
    )
  }

  getDailyLeackage(name: string, dateFilter: DashboardDateFilterModel): Observable<ChartApiResponse> {
    this.dailyLeackageLoading$.set(true);
    var params = new HttpParams();
    params = params.append('startDate', dateFilter.startDate.toISOString());
    params = params.append('endDate', dateFilter.endDate.toISOString());
    if(name) params = params.append('name', name);
    return this.http.get<ChartApiResponse>(this.apiUrl + '/DailyLeackageChart', {params}).pipe(
      finalize(() => this.dailyLeackageLoading$.set(false))
    )
  }
}
