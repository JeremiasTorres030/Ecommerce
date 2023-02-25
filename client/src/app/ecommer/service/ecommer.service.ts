import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { map, Observable, tap } from 'rxjs';
import {
  Categories,
  genericResponse,
  loginResponse,
  Product,
  User,
  UserData,
  userForm,
  userFormRegister,
} from '../types/types';
@Injectable({
  providedIn: 'root',
})
export class EcommerService {
  private API_URL: string = environment.API_URL;
  private user: UserData = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
  };

  get userGet() {
    return this.user;
  }

  public loginEvent = new EventEmitter();

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.API_URL}product/get/all`);
  }

  getProductsByUser(userId: number): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${this.API_URL}user/products/${userId}`
    );
  }

  getProductsByCategory(categoryName: Categories): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${this.API_URL}category/${categoryName}`
    );
  }

  getProductsBySubCategory(
    SubCategoryName: string
  ): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${this.API_URL}sub-category/${SubCategoryName}`
    );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<Array<User>>(`${this.API_URL}user/${userId}`).pipe(
      map((user) => {
        return user[0];
      })
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http
      .get<Array<Product>>(`${this.API_URL}product/${productId}`)
      .pipe(
        map((product) => {
          let productTransform = product[0];
          this.getUser(productTransform.seller).subscribe({
            next: (res) => {
              productTransform.seller = `${res.first_name} ${res.last_name}`;
            },
          });

          return productTransform;
        })
      );
  }

  registerUser(userRegister: userFormRegister): Observable<genericResponse> {
    return this.http.post<genericResponse>(
      `${this.API_URL}user/`,
      userRegister
    );
  }

  loginUser(userLogin: userForm): Observable<loginResponse> {
    return this.http
      .post<loginResponse>(`${this.API_URL}user/login/`, userLogin)
      .pipe(
        tap((res) => {
          this.user = {
            id: res.user.id,
            username: res.user.username,
            first_name: '',
            last_name: '',
          };
          localStorage.setItem('token', res.token);
          this.loginEvent.emit(res.token);
        })
      );
  }

  tokenVerification(token: string): Observable<UserData> {
    const HttpHeader = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http
      .get<UserData>(`${this.API_URL}user/token/`, {
        headers: HttpHeader,
      })
      .pipe(
        tap((res) => {
          this.user = res;
        })
      );
  }

  logOutUser(token: string): Observable<UserData> {
    const HttpHeader = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.post<UserData>(
      `${this.API_URL}user/logout/`,
      {},
      {
        headers: HttpHeader,
      }
    );
  }

  createProduct(data: Product): Observable<genericResponse> {
    const token = localStorage.getItem('token');
    const HttpHeader = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.post<genericResponse>(`${this.API_URL}product/`, data, {
      headers: HttpHeader,
    });
  }
  editProduct(data: Product): Observable<genericResponse> {
    const token = localStorage.getItem('token');
    const HttpHeader = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.put<genericResponse>(`${this.API_URL}product/`, data, {
      headers: HttpHeader,
    });
  }
}
