import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public listOfProducts: Array<Product> = [];
  ngOnInit(): void {
    let localCartJson = localStorage.getItem('localCart');
    if (localCartJson) {
      const localCart: Array<Product> = JSON.parse(localCartJson);
      this.listOfProducts = localCart;
    }
  }
}
