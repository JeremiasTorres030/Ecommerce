import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EcommerService {
  constructor(private http: HttpClient) {}

  getArticles() {
    return this.http.get('');
  }
}
