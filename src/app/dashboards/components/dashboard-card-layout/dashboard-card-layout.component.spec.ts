import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardLayoutComponent } from './dashboard-card-layout.component';

describe('DashboardCardComponent', () => {
  let component: DashboardCardLayoutComponent;
  let fixture: ComponentFixture<DashboardCardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCardLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
