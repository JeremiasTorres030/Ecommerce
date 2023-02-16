import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private API_URL = environment.API_URL;
  private user: UserData = {
    id: 0,
    token: '',
    username: '',
  };
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.API_URL}product/getAll/`);
  }

  getProductsByCategory(categoryName: Categories): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${this.API_URL}category/${categoryName}`
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
              productTransform.seller = res.username;
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
      .post<loginResponse>(`${this.API_URL}userlogin/`, userLogin)
      .pipe(
        tap((res) => {
          this.user = {
            id: res.user.id,
            token: res.token,
            username: res.user.username,
          };
          localStorage.setItem('token', res.token);
        })
      );
  }
}
