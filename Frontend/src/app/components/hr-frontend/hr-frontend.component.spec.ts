import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFrontendComponent } from './hr-frontend.component';

describe('HrFrontendComponent', () => {
  let component: HrFrontendComponent;
  let fixture: ComponentFixture<HrFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrFrontendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
