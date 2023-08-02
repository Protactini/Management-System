import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardFirstStepComponent } from './on-board-first-step.component';

describe('OnBoardFirstStepComponent', () => {
  let component: OnBoardFirstStepComponent;
  let fixture: ComponentFixture<OnBoardFirstStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardFirstStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
