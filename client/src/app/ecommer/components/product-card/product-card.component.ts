import { Component, Input } from '@angular/core';
import { Product } from '../../types/types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product = {
    category: 'Ropa',
    id: 0,
    image: 'imagen.png',
    name: 'Pantalon gris largo',
    price: 150,
    seller: '',
  };
}
