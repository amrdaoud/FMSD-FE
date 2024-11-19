import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Station } from '../reports/alarms-report/models/station';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private reportUrl = environment.apiUrl + 'dashboard/';
  
  private http = inject(HttpClient);

  
  private loadingAlarmTypes$ = signal(false);
  get loadingAlarmTypes(): Signal<boolean> {
    return this.loadingAlarmTypes$;
  }

  private loadingCities$ = signal(false);
  get loadingCities(): Signal<boolean> {
    return this.loadingCities$;
  }

  private loadingStations$ = signal(false);
  get loadingStations(): Signal<boolean> {
    return this.loadingStations$;
  }

  getAlarmTypes(): Observable<string[]> {
    this.loadingAlarmTypes$.set(true);
    return this.http.get<string[]>(this.reportUrl + 'GetAllAlarmTypes').pipe(
      finalize(() => this.loadingAlarmTypes$.set(false))
    )
  }

  getCities(): Observable<string[]> {
    this.loadingCities$.set(true);
    return this.http.get<string[]>(this.reportUrl + 'GetAllCities').pipe(
      finalize(() => this.loadingCities$.set(false))
    )
  }

  getStations(name?: string): Observable<Station[]> {
    this.loadingStations$.set(true);
    let params = new HttpParams();
    if(name) {
      params = params.append('name', name);
    }
    return this.http.get<Station[]>(this.reportUrl + 'GetStation', {params}).pipe(
      finalize(() => this.loadingStations$.set(false))
    )
  }

}
