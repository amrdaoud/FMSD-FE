import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankMeasurementReportComponent } from './tank-measurement-report.component';

describe('TankMeasurementReportComponent', () => {
  let component: TankMeasurementReportComponent;
  let fixture: ComponentFixture<TankMeasurementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankMeasurementReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankMeasurementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
