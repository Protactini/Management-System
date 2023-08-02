import { TestBed } from '@angular/core/testing';

import { SingleInfoService } from './single-info.service';

describe('SingleInfoService', () => {
  let service: SingleInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
