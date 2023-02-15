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
    this.getListFromLocal();
  }

  getListFromLocal(): void {
    let cartListJson = localStorage.getItem('cartList');
    if (cartListJson) {
      const cartList: Array<Product> = JSON.parse(cartListJson);
      this.listOfProducts = cartList;
    }
  }
}
