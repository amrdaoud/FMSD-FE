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
  private apiUrl = `${environment.apiUrl}Dashboard`;

  private fuelAvailabilityLoading$ = signal(false);
  get fuelAvailabilityLoading(): Signal<boolean> {
    return computed(() => this.fuelAvailabilityLoading$())
  }

  private dailyFuelAvailabilityLoading$ = signal(false);
  get dailyFuelAvailabilityLoading(): Signal<boolean> {
    return computed(() => this.dailyFuelAvailabilityLoading$())
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
    console.log(dateFilter);
    this.dailyFuelAvailabilityLoading$.set(true);
    return this.http.post<ChartApiResponse>(this.apiUrl + '/TanksDailyFuelLevel', dateFilter).pipe(
      finalize(() => this.dailyFuelAvailabilityLoading$.set(false))
    )
  }
}
