import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrinutionDetailReportComponent } from './distrinution-detail-report.component';

describe('DistrinutionDetailReportComponent', () => {
  let component: DistrinutionDetailReportComponent;
  let fixture: ComponentFixture<DistrinutionDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrinutionDetailReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrinutionDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
