import { computed, effect, inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private breakpointObserver = inject(BreakpointObserver);
  private displayNameMap = new Map([
    [Breakpoints.Small, 'small'],
    [Breakpoints.Handset, 'handset'],
    [Breakpoints.Medium, 'medium'],
    [Breakpoints.Large, 'large'],
    [Breakpoints.XLarge, 'xlarge'],
    [Breakpoints.HandsetPortrait, 'handsetPortrait'],
    [Breakpoints.HandsetLandscape, 'handsetLandscape'],
  ]);
  deviceType = toSignal(
    this.breakpointObserver.observe([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Medium, Breakpoints.Handset, Breakpoints.Small, Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape]).pipe(
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
  dashboardCols = computed(() =>
  this.deviceType() == 'handsetLandscape' ? 2 : 
  this.deviceType() == 'handsetPortrait' ? 2 : 
  this.deviceType() == 'small' ? 2 : 
  this.deviceType() == 'handset' ? 2 : 
  this.deviceType() == 'medium' ? 4 : 
  this.deviceType() == 'large' ? 4 :
  this.deviceType() == 'xlarge' ? 4 : 4);
}
