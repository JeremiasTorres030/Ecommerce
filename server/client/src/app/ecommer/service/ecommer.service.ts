import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { map, Observable, tap } from 'rxjs';
import {
  Categories,
  genericResponse,
  loginResponse,
  Product,
  ProductResponse,
  ProductsPaginated,
  ProductWithSellerId,
  User,
  userForm,
  userFormRegister,
  UserResponse,
} from '../types/types';
@Injectable({
  providedIn: 'root',
})
export class EcommerService {
  private API_URL: string = environment.API_URL;
  private user: User = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    image: '',
  };

  get userGet() {
    return this.user;
  }

  public loginEvent = new EventEmitter();

  constructor(private http: HttpClient) {}

  getProductsByName(productName: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${this.API_URL}product/name/${productName}`
    );
  }

  getProductsByUser(
    userId: number,
    page: string = '1'
  ): Observable<ProductsPaginated> {
    return this.http
      .get<ProductsPaginated>(
        `${this.API_URL}user/products/${userId}?p=${page}`
      )
      .pipe(
        map((res) => {
          for (let i = 0; i < res.results.products.length; i++) {
            res.results.products[i].image = `${res.results.products[
              i
            ].image.slice(0, 50)}h_300,w_300${res.results.products[
              i
            ].image.slice(49)}`;
          }
          return res;
        })
      );
  }

  getProductsByCategory(
    categoryName: Categories,
    page: string = '1'
  ): Observable<ProductsPaginated> {
    return this.http
      .get<ProductsPaginated>(
        `${this.API_URL}category/${categoryName}?p=${page}`
      )
      .pipe(
        map((res) => {
          for (let i = 0; i < res.results.products.length; i++) {
            res.results.products[i].image = `${res.results.products[
              i
            ].image.slice(0, 50)}h_300,w_300${res.results.products[
              i
            ].image.slice(49)}`;
          }
          return res;
        })
      );
  }

  getProductsBySubCategory(
    SubCategoryName: string,
    page: string = '1'
  ): Observable<ProductsPaginated> {
    return this.http
      .get<ProductsPaginated>(
        `${this.API_URL}sub-category/${SubCategoryName}?p=${page}`
      )
      .pipe(
        map((res) => {
          for (let i = 0; i < res.results.products.length; i++) {
            res.results.products[i].image = `${res.results.products[
              i
            ].image.slice(0, 50)}h_300,w_300${res.results.products[
              i
            ].image.slice(49)}`;
          }
          return res;
        })
      );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<UserResponse>(`${this.API_URL}user/${userId}`).pipe(
      map((res) => {
        if (res.ok) {
          return res.data[0];
        }
        return {
          username: '',
          email: '',
          first_name: '',
          id: 0,
          last_name: '',
          image: '',
        };
      })
    );
  }

  getProduct(
    productId: number,
    withSeller: boolean = true
  ): Observable<ProductWithSellerId | Product> {
    return this.http
      .get<ProductResponse>(`${this.API_URL}product/${productId}`)
      .pipe(
        map((res) => {
          if (withSeller) {
            let product = res.data[0];
            let productTransform: ProductWithSellerId = {
              ...product,
              sellerId: product.seller,
            };
            this.getUser(productTransform.seller).subscribe({
              next: (res) => {
                productTransform.seller = `${res.first_name} ${res.last_name}`;
              },
            });
            return productTransform;
          }
          return res.data[0];
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
            first_name: res.user.first_name,
            last_name: res.user.last_name,
            email: res.user.email,
            image: res.user.image,
          };
          localStorage.setItem('token', res.token);
          this.loginEvent.emit({
            token: res.token,
            username: res.user.username,
          });
        })
      );
  }

  tokenVerification(token: string): Observable<User> {
    const HttpHeader = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http
      .get<User>(`${this.API_URL}user/token/`, {
        headers: HttpHeader,
      })
      .pipe(
        tap((res) => {
          this.user = res;
        })
      );
  }

  logOutUser(token: string): Observable<User> {
    const HttpHeader = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.post<User>(
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

  deleteProduct(productId: string): Observable<genericResponse> {
    const token = localStorage.getItem('token');
    const HttpHeader = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.delete<genericResponse>(
      `${this.API_URL}product/${productId}`,
      {
        headers: HttpHeader,
      }
    );
  }

  editUser(data: User): Observable<genericResponse> {
    const token = localStorage.getItem('token');
    const HttpHeader = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.put<genericResponse>(
      `${this.API_URL}user/${this.userGet.id}`,
      data,
      {
        headers: HttpHeader,
      }
    );
  }
}
