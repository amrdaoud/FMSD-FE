import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFuelAvailabilityCardComponent } from './daily-fuel-availability-card.component';

describe('DailyFuelAvailabilityCardComponent', () => {
  let component: DailyFuelAvailabilityCardComponent;
  let fixture: ComponentFixture<DailyFuelAvailabilityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyFuelAvailabilityCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyFuelAvailabilityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
