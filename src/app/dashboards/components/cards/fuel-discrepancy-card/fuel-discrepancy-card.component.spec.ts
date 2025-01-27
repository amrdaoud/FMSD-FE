import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelDiscrepancyCardComponent } from './fuel-discrepancy-card.component';

describe('FuelDiscrepancyCardComponent', () => {
  let component: FuelDiscrepancyCardComponent;
  let fixture: ComponentFixture<FuelDiscrepancyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelDiscrepancyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelDiscrepancyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
