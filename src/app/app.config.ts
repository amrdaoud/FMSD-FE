import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { provideHttpClient } from '@angular/common/http';

const MY_FORMATS = {
  parse: {
    dateInput: 'l',
  },
  display: {
    dateInput: 'll',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
    provideMomentDateAdapter(MY_FORMATS),
    provideHttpClient()
  ]
};

