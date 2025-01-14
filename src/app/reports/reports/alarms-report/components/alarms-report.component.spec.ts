import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsReportComponent } from './alarms-report.component';

describe('AlarmsReportComponent', () => {
  let component: AlarmsReportComponent;
  let fixture: ComponentFixture<AlarmsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmsReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
