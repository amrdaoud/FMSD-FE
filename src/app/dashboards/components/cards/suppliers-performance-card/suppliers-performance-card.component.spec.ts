import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersPerformanceCardComponent } from './suppliers-performance-card.component';

describe('SuppliersPerformanceCardComponent', () => {
  let component: SuppliersPerformanceCardComponent;
  let fixture: ComponentFixture<SuppliersPerformanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersPerformanceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersPerformanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
