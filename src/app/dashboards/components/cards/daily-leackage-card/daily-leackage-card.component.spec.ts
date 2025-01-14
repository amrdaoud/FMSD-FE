import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLeackageCardComponent } from './daily-leackage-card.component';

describe('DailyLeackageCardComponent', () => {
  let component: DailyLeackageCardComponent;
  let fixture: ComponentFixture<DailyLeackageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyLeackageCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyLeackageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
