import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EcommerService } from './ecommer.service';

describe('EcommerService', () => {
  let service: EcommerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(EcommerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
