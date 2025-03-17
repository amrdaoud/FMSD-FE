import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationDetailReportComponent } from './calibration-detail-report.component';

describe('CalibrationDetailReportComponent', () => {
  let component: CalibrationDetailReportComponent;
  let fixture: ComponentFixture<CalibrationDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalibrationDetailReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalibrationDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
