import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRHireCarVisaInfoComponent } from './hrhire-car-visa-info.component';

describe('HRHireCarVisaInfoComponent', () => {
  let component: HRHireCarVisaInfoComponent;
  let fixture: ComponentFixture<HRHireCarVisaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRHireCarVisaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRHireCarVisaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
