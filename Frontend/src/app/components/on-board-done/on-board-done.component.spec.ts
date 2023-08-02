import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardDoneComponent } from './on-board-done.component';

describe('OnBoardDoneComponent', () => {
  let component: OnBoardDoneComponent;
  let fixture: ComponentFixture<OnBoardDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
