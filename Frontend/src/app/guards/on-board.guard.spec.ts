import { TestBed } from '@angular/core/testing';

import { OnBoardGuard } from './on-board.guard';

describe('OnBoardGuard', () => {
  let guard: OnBoardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnBoardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
