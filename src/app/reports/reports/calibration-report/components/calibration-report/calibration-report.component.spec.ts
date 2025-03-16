import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationReportComponent } from './calibration-report.component';

describe('CalibrationReportComponent', () => {
  let component: CalibrationReportComponent;
  let fixture: ComponentFixture<CalibrationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalibrationReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalibrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
