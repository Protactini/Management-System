import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardSecondStepComponent } from './on-board-second-step.component';

describe('OnBoardSecondStepComponent', () => {
  let component: OnBoardSecondStepComponent;
  let fixture: ComponentFixture<OnBoardSecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardSecondStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
