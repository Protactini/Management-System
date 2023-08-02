import { TestBed } from '@angular/core/testing';

import { LoggedInResolver } from './logged-in.resolver';

describe('LoggedInResolver', () => {
  let resolver: LoggedInResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LoggedInResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
