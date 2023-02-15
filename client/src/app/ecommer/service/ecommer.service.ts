import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { map, Observable } from 'rxjs';
import { Categories, Product } from '../types/types';
@Injectable({
  providedIn: 'root',
})
export class EcommerService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.API_URL}product/getAll/`);
  }

  getProductsByCategory(categoryName: Categories): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${this.API_URL}category/${categoryName}`
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http
      .get<Array<Product>>(`${this.API_URL}product/${productId}`)
      .pipe(
        map((product) => {
          return product[0];
        })
      );
  }
}
