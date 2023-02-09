import { fakeAsync, TestBed } from '@angular/core/testing';
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

  it('should have a getAllProducts', () => {
    expect(service.getAllProducts).toBeDefined();
  });

  it('getAllProducts should return an array of products', () => {});
});
