import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../types/types';

@Component({
  selector: 'app-long-product-card',
  templateUrl: './long-product-card.component.html',
  styleUrls: ['./long-product-card.component.css'],
})
export class LongProductCardComponent {
  @Output() updateCartList = new EventEmitter();
  @Input() product: Product = {
    category: 'Ropa',
    id: 0,
    image: 'imagen.png',
    name: 'Pantalon gris largo',
    price: 150,
    seller: '',
    sub_category: '',
  };

  removeProduct(): void {
    const cartListLocal: string | null = localStorage.getItem('cartList');
    let cartList: Array<Product> = [];
    if (cartListLocal) {
      cartList = JSON.parse(cartListLocal);
      const index = cartList.findIndex(({ id }) => {
        return id == this.product.id;
      });
      cartList.splice(index, 1);
      localStorage.setItem('cartList', JSON.stringify(cartList));
      this.updateCartList.emit();
    }
  }

  removeAll(): void {
    localStorage.setItem('cartList', JSON.stringify([]));
    this.updateCartList.emit();
  }
}
