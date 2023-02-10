import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../types/types';
@Injectable({
  providedIn: 'root',
})
export class EcommerService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.API_URL}product/`);
  }

  getProductsByCategory(categoryName: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${this.API_URL}category/${categoryName}`
    );
  }
}
