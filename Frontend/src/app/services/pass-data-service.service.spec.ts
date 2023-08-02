import { TestBed } from '@angular/core/testing';

import { PassDataServiceService } from './pass-data-service.service';

describe('PassDataServiceService', () => {
  let service: PassDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
