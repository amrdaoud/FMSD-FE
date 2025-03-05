import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallStationCardsComponent } from './small-station-cards.component';

describe('SmallStationCardsComponent', () => {
  let component: SmallStationCardsComponent;
  let fixture: ComponentFixture<SmallStationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallStationCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallStationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
