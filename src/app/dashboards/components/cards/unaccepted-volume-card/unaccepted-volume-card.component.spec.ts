import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnacceptedVolumeCardComponent } from './unaccepted-volume-card.component';

describe('UnacceptedVolumeCardComponent', () => {
  let component: UnacceptedVolumeCardComponent;
  let fixture: ComponentFixture<UnacceptedVolumeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnacceptedVolumeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnacceptedVolumeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
