import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrVisaPageComponent } from './hr-visa-page.component';

describe('HrVisaPageComponent', () => {
  let component: HrVisaPageComponent;
  let fixture: ComponentFixture<HrVisaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrVisaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrVisaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
