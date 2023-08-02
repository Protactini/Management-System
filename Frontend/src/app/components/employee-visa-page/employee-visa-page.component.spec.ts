import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVisaPageComponent } from './employee-visa-page.component';

describe('EmployeeVisaPageComponent', () => {
  let component: EmployeeVisaPageComponent;
  let fixture: ComponentFixture<EmployeeVisaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeVisaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeVisaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
