import { TestBed } from '@angular/core/testing';

import { EcommerService } from './ecommer.service';

describe('EcommerService', () => {
  let service: EcommerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
