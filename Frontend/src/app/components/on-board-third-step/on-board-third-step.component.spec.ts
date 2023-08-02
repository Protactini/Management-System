import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardThirdStepComponent } from './on-board-third-step.component';

describe('OnBoardThirdStepComponent', () => {
  let component: OnBoardThirdStepComponent;
  let fixture: ComponentFixture<OnBoardThirdStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardThirdStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
