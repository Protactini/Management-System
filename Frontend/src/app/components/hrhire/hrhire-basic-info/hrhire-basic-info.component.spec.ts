import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRHireBasicInfoComponent } from './hrhire-basic-info.component';

describe('HRHireBasicInfoComponent', () => {
  let component: HRHireBasicInfoComponent;
  let fixture: ComponentFixture<HRHireBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRHireBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRHireBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
