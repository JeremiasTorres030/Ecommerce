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
  ProductResponse,
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

  it('should have a getAllProducts function', () => {
    expect(service.getAllProducts).toBeDefined();
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

  it('getAllProducts should return an array of products', () => {
    const expectedResponse: ProductResponse = {
      data: [
        {
          id: 3,
          name: 'Objeto ropa',
          price: 123123,
          image: '/images/Trousers-colourisolated_A2tU4ZN.jpg',
          category: 'Ropa',
          seller: 'test',
          sub_category: 'test',
        },
        {
          id: 4,
          name: 'Objeto Computacion',
          price: 123123,
          image: '/images/1641232063339_400x400.jpg',
          category: 'Computacion',
          seller: 'test',
          sub_category: 'test',
        },
      ],
      ok: true,
    };

    service.getAllProducts().subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}product/get/all`);
    req.flush(expectedResponse);
  });

  it('getProductsByCategory should return an array of Ropa products', () => {
    const expectedResponse: ProductResponse = {
      data: [
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
      ok: true,
    };

    const categoryName: Categories = 'Ropa';

    service.getProductsByCategory(categoryName).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
        res.data.forEach(({ category }) => {
          expect(category).toEqual(categoryName);
        });
      },
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}category/${categoryName}`
    );
    req.flush(expectedResponse);
  });

  it('getUser should return a user', () => {
    const serverResponse: UserResponse = {
      data: [
        {
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
    };

    service.getUser('1').subscribe({
      next: (res) => {
        console.log(res);
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

    const expectedResponse: ProductResponse = {
      data: [
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
    };

    service.getProductsByUser(0).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}user/products/${userId}`
    );
    req.flush(expectedResponse);
  });

  it('getProductsBySubCategory should return a array of products ', () => {
    const SubCategoryName = 'Mouse';

    const expectedResponse: ProductResponse = {
      data: [
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
    };

    service.getProductsBySubCategory(SubCategoryName).subscribe({
      next: (res) => {
        expect(res).toEqual(expectedResponse);
      },
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}sub-category/${SubCategoryName}`
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
