import { computed, inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }
  private breakpointObserver = inject(BreakpointObserver);
  private displayNameMap = new Map([
    [Breakpoints.Handset, 'handset'],
    [Breakpoints.Medium, 'medium'],
    [Breakpoints.Large, 'large'],
    [Breakpoints.XLarge, 'xlarge'],
  ]);
  deviceType = toSignal(
    this.breakpointObserver.observe([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Medium, Breakpoints.Handset]).pipe(
      map(result => {
       for(const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          return this.displayNameMap.get(query) ?? 'Unknown';
        }
       }
       return 'medium'
      })
    ), {initialValue: 'medium'}
  );
  dashboardCols = computed(() => this.deviceType() == 'handset' ? 2 : 
  this.deviceType() == 'medium' ? 3 : 
  this.deviceType() == 'large' ? 4 :
  this.deviceType() == 'xlarge' ? 5 : 4);
}
