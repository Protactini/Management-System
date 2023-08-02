import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrVisaStatusComponent } from './hr-visa-status.component';

describe('HrVisaStatusComponent', () => {
  let component: HrVisaStatusComponent;
  let fixture: ComponentFixture<HrVisaStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrVisaStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrVisaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
