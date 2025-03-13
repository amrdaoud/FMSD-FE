import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeakageComponent } from './leakage.component';

describe('LeakageComponent', () => {
  let component: LeakageComponent;
  let fixture: ComponentFixture<LeakageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeakageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeakageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
