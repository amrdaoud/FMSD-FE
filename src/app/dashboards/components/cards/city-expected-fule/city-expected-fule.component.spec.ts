import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityExpectedFuleComponent } from './city-expected-fule.component';

describe('CityExpectedFuleComponent', () => {
  let component: CityExpectedFuleComponent;
  let fixture: ComponentFixture<CityExpectedFuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityExpectedFuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityExpectedFuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
