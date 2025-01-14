import { inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GeneralFilterModel } from '../../app-reusables/models/general-filter';
import { DataWithSize } from '../../app-reusables/models/data-with-size';
import { finalize, Observable, tap, filter, map } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportUrl = environment.apiUrl + 'report/';

  private http = inject(HttpClient);

  private loading$ = signal(false);
  get loading(): Signal<boolean> {
    return this.loading$;
  }

  private loadingDownload$ = signal(0);
  get loadingDownload(): Signal<number> {
    return this.loadingDownload$;
  } 


  getData<T>(endPoint: string,filter: GeneralFilterModel): Observable<DataWithSize<T>> {
    this.loading$.set(true);
    return this.http.post<DataWithSize<T>>(this.reportUrl + endPoint, filter).pipe(
      finalize(() => this.loading$.set(false))
    )
  }

  downloadData(endPoint: string,filterObject: GeneralFilterModel): Observable<any> {
    this.loadingDownload$.set(0);
    const req = new HttpRequest('POST', this.reportUrl + endPoint, filterObject,
      {
        reportProgress: true,
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'blob'
      });
    
    return this.http.request(req)
      .pipe(
        tap((evt: HttpEvent<unknown>) => {
          this.loadingDownload$.set(this.handleProgress(evt))
        }),
        filter((evt: HttpEvent<unknown>) => evt.type === HttpEventType.Response),
        map((resp: HttpEvent<any>) => {
          this.loadingDownload$.set(0);
          return (resp as HttpResponse<any>).body
          }),
          finalize(() => this.loadingDownload$.set(0))
      );
  }

  private handleProgress(event: HttpEvent<unknown>): number{
    switch(event.type) {
        case HttpEventType.Sent :
          return 0;
        case HttpEventType.ResponseHeader:
          return 0
        case HttpEventType.DownloadProgress:
          return 100 * (event.loaded / (event.total ?? 0))
        case HttpEventType.Response:
          return 100
        default :
          return 100
    }
  }


}
