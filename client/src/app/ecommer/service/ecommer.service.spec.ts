import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EcommerService } from './ecommer.service';
import { environment } from 'src/environments/environment.development';
import { Categories } from '../types/types';

describe('EcommerService', () => {
  let service: EcommerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EcommerService],
    });
    service = TestBed.inject(EcommerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a getAllProducts function', () => {
    expect(service.getAllProducts).toBeDefined();
  });

  it('should have a getProductsByCategory function', () => {
    expect(service.getProductsByCategory).toBeDefined();
  });

  it('getAllProducts should return an array of products', () => {
    const expectedResponse = [
      {
        id: 3,
        name: 'Objeto ropa',
        price: 123123,
        image: '/images/Trousers-colourisolated_A2tU4ZN.jpg',
        category: 'Ropa',
        seller: 1,
      },
      {
        id: 4,
        name: 'Objeto Computacion',
        price: 123123,
        image: '/images/1641232063339_400x400.jpg',
        category: 'Computacion',
        seller: 1,
      },
    ];

    service.getAllProducts().subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}product/getAll/`);
    req.flush(expectedResponse);
  });

  it('getProductsByCategory should return an array of Ropa products', () => {
    const expectedResponse = [
      {
        id: 3,
        name: 'Objeto ropa',
        price: 123123,
        image: '/images/Trousers-colourisolated_A2tU4ZN.jpg',
        category: 'Ropa',
        seller: 1,
      },
      {
        id: 4,
        name: 'Objeto ropa',
        price: 123123,
        image: '/images/Trousers-colourisolated_A2tU4ZN.jpg',
        category: 'Ropa',
        seller: 1,
      },
      {
        id: 5,
        name: 'Objeto ropa',
        price: 123123,
        image: '/images/Trousers-colourisolated_A2tU4ZN.jpg',
        category: 'Ropa',
        seller: 1,
      },
    ];

    const categoryName: Categories = 'Ropa';

    service.getProductsByCategory(categoryName).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
        res.forEach(({ category }) => {
          expect(category).toEqual(categoryName);
        });
      },
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}category/${categoryName}`
    );
    req.flush(expectedResponse);
  });
});
