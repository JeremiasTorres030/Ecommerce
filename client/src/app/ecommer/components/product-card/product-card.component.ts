import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../types/types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product = {
    category: 'Ropa',
    sub_category: '',
    id: 0,
    image: 'imagen.png',
    name: 'Pantalon gris largo',
    price: 150,
    seller: '',
  };
  @Input() userButtons: boolean = false;
  @Output() userButtonClicked = new EventEmitter();
  editButton(): void {
    this.userButtonClicked.emit({
      type: 'Edit',
      value: this.product,
    });
    window.scrollTo(0, 0);
  }

  deleteButton(): void {
    this.userButtonClicked.emit({
      type: 'Delete',
      value: this.product.id,
    });
  }
}
