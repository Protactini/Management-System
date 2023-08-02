import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRHireContactInfoComponent } from './hrhire-contact-info.component';

describe('HRHireContactInfoComponent', () => {
  let component: HRHireContactInfoComponent;
  let fixture: ComponentFixture<HRHireContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRHireContactInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRHireContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
