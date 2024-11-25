import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTypesCardComponent } from './alarm-types-card.component';

describe('AlarmTypesCardComponent', () => {
  let component: AlarmTypesCardComponent;
  let fixture: ComponentFixture<AlarmTypesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmTypesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmTypesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
