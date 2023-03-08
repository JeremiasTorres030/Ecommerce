import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EcommerService } from './ecommer.service';
import { environment } from 'src/environments/environment.development';
import {
  Categories,
  genericResponse,
  loginResponse,
  Product,
  ProductsPaginated,
  User,
  userForm,
  userFormRegister,
  UserResponse,
} from '../types/types';

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

  it('should have a getUser function', () => {
    expect(service.getUser).toBeDefined();
  });

  it('should have a getProductsByCategory function', () => {
    expect(service.getProductsByCategory).toBeDefined();
  });

  it('should have a registerUser function', () => {
    expect(service.registerUser).toBeDefined();
  });

  it('should have a loginUser function', () => {
    expect(service.loginUser).toBeDefined();
  });

  it('should have a tokenVerification function', () => {
    expect(service.tokenVerification).toBeDefined();
  });

  it('should have a logOutUser function', () => {
    expect(service.logOutUser).toBeDefined();
  });

  it('getProductsByCategory should return an array of Ropa products', () => {
    const expectedResponse: ProductsPaginated = {
      next: '0',
      previous: '0',
      results: {
        ok: true,
        products: [
          {
            id: 0,
            name: 'test',
            price: 0,
            image: 'test',
            category: 'Ropa',
            sub_category: 'test',
            seller: 'test',
          },
          {
            id: 0,
            name: 'test',
            price: 0,
            image: 'test',
            category: 'Ropa',
            sub_category: 'test',
            seller: 'test',
          },
          {
            id: 0,
            name: 'test',
            price: 0,
            image: 'test',
            category: 'Ropa',
            sub_category: 'test',
            seller: 'test',
          },
        ],
      },
    };

    const categoryName: Categories = 'Ropa';

    service.getProductsByCategory(categoryName).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
        res.results.products.forEach(({ category }) => {
          expect(category).toEqual(categoryName);
        });
      },
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}category/${categoryName}?p=1`
    );
    req.flush(expectedResponse);
  });

  it('getUser should return a user', () => {
    const serverResponse: UserResponse = {
      data: [
        {
          image: 'test',
          username: 'test',
          first_name: 'test',
          last_name: 'test',
          email: 'test',
          id: 0,
        },
      ],
      ok: true,
    };

    const expectedResponse: User = {
      username: 'test',
      first_name: 'test',
      last_name: 'test',
      email: 'test',
      id: 0,
      image: 'test',
    };

    service.getUser('1').subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}user/1`);
    req.flush(serverResponse);
  });

  it('registerUser it should return a genericResponse', () => {
    const expectedResponse: genericResponse = {
      ok: true,
      msg: 'Test correcto',
    };

    const registerUserData: userFormRegister = {
      email: 'test@test.com',
      password: 'test',
      username: 'test',
      first_name: 'test',
      last_name: 'test',
    };

    service.registerUser(registerUserData).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}user/`);
    req.flush(expectedResponse);
  });

  it('loginUser it should return a loginResponse', () => {
    const expectedResponse: loginResponse = {
      token: 'tokenTest',
      user: {
        id: 1,
        username: 'test',
        email: 'test',
        first_name: 'test',
        last_name: 'test',
        image: 'test',
      },
    };

    const loginUserData: userForm = {
      password: 'test',
      username: 'test',
    };

    service.loginUser(loginUserData).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}user/login/`);
    req.flush(expectedResponse);
  });

  it('tokenVerification should return a UserData ', () => {
    const expectedResponse: User = {
      id: 0,
      username: 'test',
      first_name: 'test',
      last_name: 'test',
      email: 'test',
      image: 'test',
    };

    service.tokenVerification('testToken').subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}user/token/`);
    req.flush(expectedResponse);
  });

  it('getProductsByUser should return a array of products ', () => {
    const userId = 0;
    const expectedResponse: ProductsPaginated = {
      next: '1',
      previous: '2',
      results: {
        ok: true,
        products: [
          {
            id: 0,
            category: '',
            image: '',
            name: '',
            price: 0,
            seller: '',
            sub_category: '',
          },
        ],
      },
    };

    service.getProductsByUser(0).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}user/products/${userId}?p=1`
    );
    req.flush(expectedResponse);
  });

  it('getProductsBySubCategory should return a array of products ', () => {
    const SubCategoryName = 'Mouse';

    const expectedResponse: ProductsPaginated = {
      next: '1',
      previous: '1',
      results: {
        products: [
          {
            id: 0,
            category: '',
            image: '',
            name: '',
            price: 0,
            seller: '',
            sub_category: '',
          },
        ],
        ok: true,
      },
    };

    service.getProductsBySubCategory(SubCategoryName).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}sub-category/${SubCategoryName}?p=1`
    );
    req.flush(expectedResponse);
  });

  it('createProduct should return a generic response ', () => {
    const expectedResponse: genericResponse = {
      msg: 'test',
      ok: true,
    };

    const formDataMock: Product = {
      category: 'test',
      id: 0,
      image: 'test',
      name: 'test',
      price: 0,
      seller: 'test',
      sub_category: 'test',
    };

    service.createProduct(formDataMock).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}product/`);
    req.flush(expectedResponse);
  });

  it('editProduct should return a generic response ', () => {
    const expectedResponse: genericResponse = {
      msg: 'test',
      ok: true,
    };

    const formDataMock: Product = {
      category: 'test',
      id: 0,
      image: 'test',
      name: 'test',
      price: 0,
      seller: 'test',
      sub_category: 'test',
    };

    service.editProduct(formDataMock).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}product/`);
    req.flush(expectedResponse);
  });
});
