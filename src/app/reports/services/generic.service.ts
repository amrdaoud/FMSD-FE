import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Station } from '../reports/alarms-report/models/station';
import { Tank } from '../reports/alarms-report/models/tank';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private reportUrl = environment.apiUrl + 'filters/';
  
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

  private loadingTanks$ = signal(false);
  get loadingTanks(): Signal<boolean> {
    return this.loadingTanks$;
  }

  getAlarmTypes(): Observable<string[]> {
    this.loadingAlarmTypes$.set(true);
    return this.http.get<string[]>(this.reportUrl + 'AlarmTypes').pipe(
      finalize(() => this.loadingAlarmTypes$.set(false))
    )
  }

  getCities(): Observable<string[]> {
    this.loadingCities$.set(true);
    return this.http.get<string[]>(this.reportUrl + 'cities').pipe(
      finalize(() => this.loadingCities$.set(false))
    )
  }

  getStations(name?: string): Observable<Station[]> {
    this.loadingStations$.set(true);
    let params = new HttpParams();
    if(name) {
      params = params.append('name', name);
    }
    return this.http.get<Station[]>(this.reportUrl + 'stations', {params}).pipe(
      finalize(() => this.loadingStations$.set(false))
    )
  }

  getTanks(cityName?: string, stationGuid?: string): Observable<Tank[]> {
    this.loadingTanks$.set(true);
    let params = new HttpParams();
    if(cityName) {
      params = params.append('cityName', cityName);
    }
    if(stationGuid) {
      params = params.append('stationGuid', stationGuid);
    }
    return this.http.get<Tank[]>(this.reportUrl + 'Tanks', {params}).pipe(
      finalize(() => this.loadingTanks$.set(false))
    )
  }

}
