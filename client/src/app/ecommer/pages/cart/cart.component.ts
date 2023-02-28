import { Component, OnInit } from '@angular/core';
import { ProductWithSellerId } from '../../types/types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public listOfProducts: Array<ProductWithSellerId> = [];
  public totalPrice: number = 0;

  ngOnInit(): void {
    this.getListFromLocal();
  }

  getListFromLocal(): void {
    let cartListJson = localStorage.getItem('cartList');
    if (cartListJson) {
      const cartList: Array<ProductWithSellerId> = JSON.parse(cartListJson);
      this.listOfProducts = cartList;
      this.calculatePrice(cartList.map(({ price }) => price));
    }
  }

  removeAll(): void {
    localStorage.setItem('cartList', JSON.stringify([]));
    this.getListFromLocal();
  }

  calculatePrice(prices: Array<number>): void {
    let price = 0;
    for (let i = 0; i < prices.length; i++) {
      price += prices[i];
    }
    this.totalPrice = price;
  }
}
