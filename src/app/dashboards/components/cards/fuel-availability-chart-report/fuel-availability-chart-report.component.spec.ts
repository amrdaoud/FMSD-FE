import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelAvailabilityChartReportComponent } from './fuel-availability-chart-report.component';

describe('FuelAvailabilityChartReportComponent', () => {
  let component: FuelAvailabilityChartReportComponent;
  let fixture: ComponentFixture<FuelAvailabilityChartReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelAvailabilityChartReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelAvailabilityChartReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
